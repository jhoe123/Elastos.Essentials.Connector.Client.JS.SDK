import { VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
export declare class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation>;
    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any>;
}
