import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class RequestCredentialsRequest implements ISerializableRequest {
    // TODO: use the ready query type with claims, customization
    constructor(private request: DID.CredentialDisclosureRequest) {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/requestcredentials";
        payload += "?request=" + encodeURIComponent(JSON.stringify(this.request));

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}