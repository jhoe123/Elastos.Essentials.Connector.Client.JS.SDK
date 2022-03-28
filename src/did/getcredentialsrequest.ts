import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class GetCredentialsRequest implements ISerializableRequest {
    // TODO: use the ready query type with claims, customization
    constructor(private query: any) {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/credaccess";
        payload += "?claims=" + encodeURIComponent(JSON.stringify(this.query.claims));

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        // TODO: customization, other params

        return payload;
    }
}