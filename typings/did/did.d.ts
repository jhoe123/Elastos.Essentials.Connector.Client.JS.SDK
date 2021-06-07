import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Interfaces } from "@elastosfoundation/elastos-connectivity-sdk-js";
export declare class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation>;
    static importCredentials(credentials: VerifiableCredential[]): Promise<Interfaces.Connectors.ImportedCredential[]>;
    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any>;
}
