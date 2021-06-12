import WalletConnectProvider from "@walletconnect/web3-provider";
declare class WalletConnectManager {
    private walletConnectProvider;
    ensureConnected(onConnected: () => void, onCancelled: () => void): Promise<void>;
    private setupWalletConnectProvider;
    /**
     * Force using an external WC provider instead of our own. Useful in apps that have to use wallet
     * connect independently as well.
     */
    useWalletConnectProvider(provider: WalletConnectProvider): void;
    getWalletConnectProvider(): WalletConnectProvider;
    sendCustomRequest(intentUrl: string): Promise<any>;
}
export declare const walletConnectManager: WalletConnectManager;
export {};
