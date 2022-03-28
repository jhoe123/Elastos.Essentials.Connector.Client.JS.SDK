import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class RequestPublishRequest implements ISerializableRequest {
    constructor() {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/promptpublishdid";
        payload += "?caller=" + encodeURIComponent(getSafeApplicationDID()); // Client application making this call (usually the same as the appdid but could be different)

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}