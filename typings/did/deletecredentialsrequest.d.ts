import type { ISerializableRequest } from "../iserializablerequest";
export declare class DeleteCredentialsRequest implements ISerializableRequest {
    private credentialsIds;
    constructor(credentialsIds: string[]);
    getPayload(): string;
}
