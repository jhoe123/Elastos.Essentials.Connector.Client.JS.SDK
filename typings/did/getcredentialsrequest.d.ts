import type { ISerializableRequest } from "../iserializablerequest";
export declare class GetCredentialsRequest implements ISerializableRequest {
    private query;
    constructor(query: any);
    getPayload(): string;
}
