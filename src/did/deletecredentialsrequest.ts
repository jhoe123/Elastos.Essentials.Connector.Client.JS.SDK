import type { ISerializableRequest } from "../iserializablerequest";

export class DeleteCredentialsRequest implements ISerializableRequest {
    constructor(private credentialsIds: string[]) {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/creddelete";
        payload += "?credentialsids=" + encodeURIComponent(JSON.stringify(this.credentialsIds));
        return payload;
    }
}