import { DID } from "./did/did";
import { GetCredentialsRequest } from "./did/getcredentialsrequest";
import type { TMPIConnector } from "./tmp/connectors/index";
import { walletConnectManager } from "./walletconnect";

export class EssentialsConnector implements TMPIConnector {
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
     * DID API
     */
    async getCredentials(query: any): Promise<any> {
        console.log("Get credentials request");

        return DID.getCredentials(query);
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