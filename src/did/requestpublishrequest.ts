import type { ISerializableRequest } from "../iserializablerequest";

export class RequestPublishRequest implements ISerializableRequest {
    constructor() {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/promptpublishdid?fakeparam=1"; // fakeparam needed because of a bug in the intent manager for now. Remove when https://app.clickup.com/t/1j2ec8m is fixed.
        return payload;
    }
}