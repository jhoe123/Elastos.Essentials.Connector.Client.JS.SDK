import { JSONObject, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as SDKDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
export declare class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation>;
    static requestCredentials(disclosureRequest: SDKDID.CredentialDisclosureRequest): Promise<VerifiablePresentation>;
    static issueCredential(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential>;
    static importCredentials(credentials: VerifiableCredential[], options?: SDKDID.ImportCredentialOptions): Promise<SDKDID.ImportedCredential[]>;
    static deleteCredentials(credentialIds: string[], options?: SDKDID.DeleteCredentialOptions): Promise<string[]>;
    static signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SDKDID.SignedData>;
    static requestPublish(): Promise<string>;
    static updateHiveVaultAddress(vaultAddress: string, displayName: string): Promise<SDKDID.UpdateHiveVaultAddressStatus>;
    static importCredentialContext(serviceName: string, contextCredential: VerifiableCredential): Promise<SDKDID.ImportedCredential>;
    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any>;
    static generateHiveBackupCredential?(sourceHiveNodeDID: string, targetHiveNodeDID: string, targetNodeURL: string): Promise<VerifiableCredential>;
}
