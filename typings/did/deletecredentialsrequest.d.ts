import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class DeleteCredentialsRequest implements ISerializableRequest {
    private credentialsIds;
    private options?;
    constructor(credentialsIds: string[], options?: DID.DeleteCredentialOptions);
    getPayload(): string;
}
