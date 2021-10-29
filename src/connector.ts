import { JSONObject, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID, Interfaces, Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { DID as ConnDID } from "./did/did";
import { Wallet as ConnWallet } from "./wallet/wallet";
import { walletConnectManager } from "./walletconnect";

export class EssentialsConnector implements Interfaces.Connectors.IConnector {
    public name: string = "essentials";

    private callbackURL: string = null;

    async getDisplayName(): Promise<string> {
        return "Elastos Essentials";
    }

    /**
     * Method for debug purpose only.
     */
    public unlinkEssentialsDevice() {
        // TODO
    }

    /**
     * Force using an external WC provider instead of the one created by the essentials connector.
     * Calling this api is neede only in case the application already has its own provider and needs
     * to share it with this connector.
     */
    public setWalletConnectProvider(provider: WalletConnectProvider) {
        walletConnectManager.useWalletConnectProvider(provider);
    }

    public getWalletConnectProvider(): WalletConnectProvider {
        return walletConnectManager.getWalletConnectProvider();
    }

    /**
     * DID API
     */
    getCredentials(query: any): Promise<any> {
        return ConnDID.getCredentials(query);
    }

    requestCredentials(request: DID.CredentialDisclosureRequest): Promise<VerifiablePresentation> {
        return ConnDID.requestCredentials(request);
    }

    issueCredential(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential> {
        return ConnDID.issueCredential(holder, types, subject, identifier, expirationDate);
    }

    importCredentials(credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions): Promise<DID.ImportedCredential[]> {
        return ConnDID.importCredentials(credentials, options);
    }

    deleteCredentials(credentialIds: string[], options?: DID.DeleteCredentialOptions): Promise<string[]> {
        return ConnDID.deleteCredentials(credentialIds, options);
    }

    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<DID.SignedData> {
        return ConnDID.signData(data, jwtExtra, signatureFieldName);
    }

    requestPublish(): Promise<string> {
        return ConnDID.requestPublish();
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        return ConnDID.generateAppIDCredential(appInstanceDID, appDID);
    }

    pay(query: any): Promise<Wallet.TransactionResult> {
        return ConnWallet.pay(query);
    }

    voteForDPoS(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    voteForCRCouncil(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    voteForCRProposal(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    sendSmartContractTransaction(payload: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
}