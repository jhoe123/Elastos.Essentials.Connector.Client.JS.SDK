import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class RequestCredentialsRequest implements ISerializableRequest {
    private request;
    constructor(request: DID.CredentialDisclosureRequest);
    getPayload(): string;
}
