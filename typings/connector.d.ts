import { VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import { Interfaces } from "@elastosfoundation/elastos-connectivity-sdk-js";
import WalletConnectProvider from "@walletconnect/web3-provider";
export declare class EssentialsConnector implements Interfaces.Connectors.IConnector {
    name: string;
    private callbackURL;
    getDisplayName(): Promise<string>;
    /**
     * Method for debug purpose only.
     */
    unlinkEssentialsDevice(): void;
    setWalletConnectProvider(provider: WalletConnectProvider): void;
    getWalletConnectProvider(): WalletConnectProvider;
    /**
     * DID API
     */
    getCredentials(query: any): Promise<any>;
    importCredentials(credentials: VerifiableCredential[]): Promise<Interfaces.Connectors.ImportedCredential[]>;
    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any>;
    pay(query: any): Promise<any>;
    voteForDPoS(): Promise<void>;
    voteForCRCouncil(): Promise<void>;
    voteForCRProposal(): Promise<void>;
    sendSmartContractTransaction(payload: any): Promise<string>;
}
