import WalletConnectProvider from "@walletconnect/web3-provider";
declare class WalletConnectManager {
    private walletConnectProvider;
    constructor();
    /**
     * Tells whether a wallet connect session exists on disk or not, not matter if it's connected
     * or not.
     */
    hasWalletConnectSession(): boolean;
    /**
     * Disconnects the active wallet connect session if any, and deletes any session from disk
     * in order to refresh start. This helps solving bad link states between dapps and wallets.
     */
    disconnectWalletConnect(): Promise<void>;
    /**
     * Makes sure that we are connected to Wallet Connect. If not, a wallet connect session
     * is started and user may have to scan a QR code to link to his device.
     */
    ensureConnected(onConnected: () => void, onCancelled: () => void): Promise<void>;
    /**
     * Same as ensureConnected() except that the connected wallet application MUST be Elastos Essentials, not
     * another mobile wallet. This is typically used to ensure that the wallet will be able to handle
     * commands such as DID operations.
     */
    ensureConnectedToEssentials(onConnected: () => void, onCancelled: () => void): Promise<void>;
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
