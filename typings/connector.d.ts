import { JSONObject, VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import { DID, Interfaces } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { TransactionResult } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
export declare class EssentialsConnector implements Interfaces.Connectors.IConnector {
    name: string;
    private callbackURL;
    getDisplayName(): Promise<string>;
    /**
     * Method for debug purpose only.
     */
    unlinkEssentialsDevice(): void;
    /**
     * Force using an external WC provider instead of the one created by the essentials connector.
     * Calling this api is neede only in case the application already has its own provider and needs
     * to share it with this connector.
     */
    setWalletConnectProvider(provider: WalletConnectProvider): void;
    getWalletConnectProvider(): WalletConnectProvider;
    /**
     * DID API
     */
    getCredentials(query: any): Promise<any>;
    issueCredential(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential>;
    importCredentials(credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions): Promise<DID.ImportedCredential[]>;
    deleteCredentials(credentialIds: string[], options?: DID.DeleteCredentialOptions): Promise<string[]>;
    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<DID.SignedData>;
    requestPublish(): Promise<string>;
    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any>;
    pay(query: any): Promise<TransactionResult>;
    voteForDPoS(): Promise<void>;
    voteForCRCouncil(): Promise<void>;
    voteForCRProposal(): Promise<void>;
    sendSmartContractTransaction(payload: any): Promise<string>;
}
