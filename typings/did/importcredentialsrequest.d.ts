import { VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class ImportCredentialsRequest implements ISerializableRequest {
    private credentials;
    constructor(credentials: VerifiableCredential[]);
    getPayload(): string;
}
