import { VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import { Interfaces } from "@elastosfoundation/elastos-connectivity-sdk-js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { DID } from "./did/did";
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
        console.log("Get credentials request");

        return DID.getCredentials(query);
    }

    importCredentials(credentials: VerifiableCredential[]): Promise<Interfaces.Connectors.ImportedCredential[]> {
        console.log("Import credentials request");

        return DID.importCredentials(credentials);
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        return DID.generateAppIDCredential(appInstanceDID, appDID);
    }

    pay(query: any): Promise<any> {
        throw new Error("Method not implemented.");
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