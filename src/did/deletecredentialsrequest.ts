import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class DeleteCredentialsRequest implements ISerializableRequest {
    constructor(private credentialsIds: string[], private options?: DID.DeleteCredentialOptions) {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/creddelete";
        payload += "?credentialsids=" + encodeURIComponent(JSON.stringify(this.credentialsIds));
        if (this.options) {
            if (this.options.forceToPublishCredentials)
                payload += "&forceToPublishCredentials";
        }

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}