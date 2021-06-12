import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as SDKDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { SignedData } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
export declare class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation>;
    static importCredentials(credentials: VerifiableCredential[]): Promise<SDKDID.ImportedCredential[]>;
    static signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SignedData>;
    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any>;
}
