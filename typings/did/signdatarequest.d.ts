import type { ISerializableRequest } from "../iserializablerequest";
export declare class SignDataRequest implements ISerializableRequest {
    private data;
    private jwtExtra?;
    private signatureFieldName?;
    constructor(data: string, jwtExtra?: any, signatureFieldName?: string);
    getPayload(): string;
}
