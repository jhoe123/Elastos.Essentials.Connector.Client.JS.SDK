import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as SDKDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { DeleteCredentialOptions, SignedData } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
export declare class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation>;
    static importCredentials(credentials: VerifiableCredential[], options?: SDKDID.ImportCredentialOptions): Promise<SDKDID.ImportedCredential[]>;
    static deleteCredentials(credentialIds: string[], options?: DeleteCredentialOptions): Promise<string[]>;
    static signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SignedData>;
    static requestPublish(): Promise<string>;
    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any>;
}
