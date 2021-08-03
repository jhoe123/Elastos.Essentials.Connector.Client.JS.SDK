import { VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import { Interfaces, DID, Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { TransactionResult } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
import { DID as ConnDID } from "./did/did";
import { Wallet as ConnWallet } from "./wallet/wallet";
import { GetCredentialsRequest } from "./did/getcredentialsrequest";
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
    async getCredentials(query: any): Promise<any> {
        return ConnDID.getCredentials(query);
    }

    importCredentials(credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions): Promise<DID.ImportedCredential[]> {
        return ConnDID.importCredentials(credentials, options);
    }

    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<DID.SignedData> {
        return ConnDID.signData(data, jwtExtra, signatureFieldName);
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        return ConnDID.generateAppIDCredential(appInstanceDID, appDID);
    }

    pay(query: any): Promise<TransactionResult> {
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