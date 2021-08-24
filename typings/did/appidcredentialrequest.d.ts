import type { ISerializableRequest } from "../iserializablerequest";
export declare class AppIDCredentialRequest implements ISerializableRequest {
    private appInstanceDID;
    private appDID;
    constructor(appInstanceDID: string, appDID: string);
    getPayload(): string;
}
