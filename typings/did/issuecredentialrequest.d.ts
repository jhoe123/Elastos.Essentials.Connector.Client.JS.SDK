import { JSONObject } from "@elastosfoundation/did-js-sdk";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class IssueCredentialRequest implements ISerializableRequest {
    private holder;
    private types;
    private subject;
    private identifier?;
    private expirationDate?;
    constructor(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string);
    getPayload(): string;
}
