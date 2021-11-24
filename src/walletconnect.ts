//import Web3 from "web3";
// HACK - Because wallet connect does not pop up the wallet when custom methods are sent
import { signingMethods } from "@walletconnect/utils";
import WalletConnectProvider from "@walletconnect/web3-provider";
signingMethods.push("essentials_url_intent");

// https://docs.walletconnect.org/quick-start/dapps/web3-provider
class WalletConnectManager {
    private walletConnectProvider: WalletConnectProvider = null;
    //private walletConnectWeb3: Web3 = null;

    constructor() {
        // Create WalletConnect Provider inconditionally to let dapps be able to
        // check the WC status even without sending commands.
        this.walletConnectProvider = new WalletConnectProvider({
            rpc: {
                20: "https://api.elastos.io/eth",           // Elastos ESC mainnet
                21: "https://api-testnet.elastos.io/eth",   // Elastos ESC testnet
                128: "https://http-mainnet.hecochain.com",   // Heco mainnet
                256: "https://http-testnet.hecochain.com",   // Heco testnet
                42161: "https://arb1.arbitrum.io/rpc", // Arbitrum mainnet
                43114: "https://api.avax.network/ext/bc/C/rpc", // Avalanche mainnet
                43113: "https://api.avax-test.network/ext/bc/C/rpc", // Avalanche testnet
                56: "https://bsc-dataseed.binance.org", // BSC mainnet
                97: "https://data-seed-prebsc-1-s1.binance.org:8545", // BSC testnet
                1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum mainnet
                3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum ropsten testnet
                250: "https://rpcapi.fantom.network", // Fantom mainnet
                4002: "https://rpc.testnet.fantom.network", // Fantom testnet
                137: "https://rpc-mainnet.maticvigil.com", // Polygon mainnet
                80001: "https://rpc-mumbai.maticvigil.com" // Polygon testnet
            },
            bridge: "https://walletconnect.trinity-tech.io/v2"
        });
    }

    /**
     * Tells whether a wallet connect session exists on disk or not, not matter if it's connected
     * or not.
     */
    public hasWalletConnectSession(): boolean {
        return !!localStorage.getItem("walletconnect");
    }

    /**
     * Disconnects the active wallet connect session if any, and deletes any session from disk
     * in order to refresh start. This helps solving bad link states between dapps and wallets.
     */
    public async disconnectWalletConnect(): Promise<void> {
        console.log("Clearing Essentials connector wallet connect");
        let connector = await this.walletConnectProvider.getWalletConnector();
        if (!this.walletConnectProvider || !connector)
            return;

        // Try to cleanly stop the session, if any.
        try {
            connector.killSession();
        }
        catch (e) { }

        // Remove WC session info from disk.
        localStorage.removeItem("walletconnect");
    }

    /**
     * Makes sure that we are connected to Wallet Connect. If not, a wallet connect session
     * is started and user may have to scan a QR code to link to his device.
     */
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

    /**
     * Same as ensureConnected() except that the connected wallet application MUST be Elastos Essentials, not
     * another mobile wallet. This is typically used to ensure that the wallet will be able to handle
     * commands such as DID operations.
     */
    public async ensureConnectedToEssentials(onConnected: () => void, onCancelled: () => void): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ensureConnected(async () => {
                // Connected - Now check the peer info to make sure this is essentials.
                let wc = await this.walletConnectProvider.getWalletConnector();
                if (!wc.peerMeta || !wc.peerMeta.name || wc.peerMeta.name.toLowerCase().indexOf("essentials") < 0) {
                    reject(new Error("This operation is only supported when connected to the Elastos Essentials wallet."));
                }
                else {
                    onConnected();
                    resolve();
                }
            }, () => {
                onCancelled();
                resolve();
            });
        });
    }

    private async setupWalletConnectProvider(): Promise<void> {
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

