import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class ImportCredentialsRequest implements ISerializableRequest {
    private credentials;
    private options?;
    constructor(credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions);
    getPayload(): string;
}
