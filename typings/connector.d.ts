import type { TMPIConnector } from "./tmp/connectors/index";
export declare class EssentialsConnector implements TMPIConnector {
    name: string;
    private callbackURL;
    getDisplayName(): Promise<string>;
    /**
     * Method for debug purpose only.
     */
    unlinkEssentialsDevice(): void;
    /**
     * DID API
     */
    getCredentials(query: any): Promise<any>;
    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any>;
    pay(query: any): Promise<any>;
    voteForDPoS(): Promise<void>;
    voteForCRCouncil(): Promise<void>;
    voteForCRProposal(): Promise<void>;
    sendSmartContractTransaction(payload: any): Promise<string>;
}
