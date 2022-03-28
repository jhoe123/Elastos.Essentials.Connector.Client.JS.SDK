import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class SignDataRequest implements ISerializableRequest {
    constructor(private data: string, private jwtExtra?: any, private signatureFieldName?: string) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/didsign";
        payload += "?data=" + encodeURIComponent(this.data);

        if (this.jwtExtra)
            payload += "&jwtExtra=" + encodeURIComponent(JSON.stringify(this.jwtExtra));

        if (this.signatureFieldName)
            payload += "&signatureFieldName=" + encodeURIComponent(this.signatureFieldName);

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}