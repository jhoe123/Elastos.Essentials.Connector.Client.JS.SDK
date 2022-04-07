import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class ImportCredentialContextRequest implements ISerializableRequest {
    private serviceName;
    private credentialContextCredential;
    constructor(serviceName: string, credentialContextCredential: VerifiableCredential);
    getPayload(): string;
}
