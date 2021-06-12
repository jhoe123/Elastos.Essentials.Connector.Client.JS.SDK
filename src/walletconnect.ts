import WalletConnectProvider from "@walletconnect/web3-provider";
//import Web3 from "web3";

// HACK - Because wallet connect does not pop up the wallet when custom methods are sent
import {signingMethods} from "@walletconnect/utils"
signingMethods.push("essentials_url_intent");

// https://docs.walletconnect.org/quick-start/dapps/web3-provider
class WalletConnectManager {
    private walletConnectProvider: WalletConnectProvider = null;
    //private walletConnectWeb3: Web3 = null;

    public async ensureConnected(onConnected: () => void, onCancelled: () => void) {
        if (!this.walletConnectProvider || !this.walletConnectProvider.connected) {
            await this.setupWalletConnectProvider();
            if (this.walletConnectProvider.connected)
                onConnected();
            else
                onCancelled();
        }
        else {
            // Already connected
            onConnected();
        }
    }

    private async setupWalletConnectProvider(): Promise<void> {
        //  Create WalletConnect Provider
        this.walletConnectProvider = new WalletConnectProvider({
            rpc: {
                20: "https://testnet.elastos.io/eth",
                21: "https://api-testnet.elastos.io/eth",
            },
            bridge: "https://walletconnect.elastos.net/v1"
            //bridge: "http://192.168.31.114:5001"
            //bridge: "http://192.168.1.6:5001"
        });

        // Enable session (triggers QR Code modal)
        console.log("Connecting to wallet connect");
        let enabled = await this.walletConnectProvider.enable();
        console.log("CONNECTED to wallet connect", enabled, this.walletConnectProvider);

        //this.walletConnectWeb3 = new Web3(this.walletConnectProvider as any /* hack */);
    }

    /**
     * Force using an external WC provider instead of our own. Useful in apps that have to use wallet
     * connect independently as well.
     */
    public useWalletConnectProvider(provider: WalletConnectProvider) {
        // Just use it. Don't do any operation such as enable() on it.
        // Assume everything is done by the app.
        this.walletConnectProvider = provider;
        //this.walletConnectWeb3 = new Web3(this.walletConnectProvider as any /* hack */);
    }

    public getWalletConnectProvider(): WalletConnectProvider {
        return this.walletConnectProvider;
    }

    public async sendCustomRequest(intentUrl: string): Promise<any> {
        let connector = await this.walletConnectProvider.getWalletConnector();

        let request = {
            id: Math.floor(Math.random() * 1000000),
            jsonrpc: "2.0",
            method: "essentials_url_intent",
            params: [{
                url: intentUrl
            }]
        };

        console.log("Sending custom request to wallet connect", request);
        const result = await connector.sendCustomRequest(request);
        console.log("Got custom request response", result);
        return result;
    }
}

export const walletConnectManager = new WalletConnectManager();

