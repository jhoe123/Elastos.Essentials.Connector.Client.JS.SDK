import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class ImportCredentialsRequest implements ISerializableRequest {
    constructor(private credentials: VerifiableCredential[], private options?: DID.ImportCredentialOptions) {
    }

    getPayload(): string {
        // VCs converted to clear json strings then back to clean JSON objects again
        let serializedCredentials = this.credentials.map(c => JSON.parse(c.toString()));

        let payload = "https://did.elastos.net/credimport";
        payload += "?credentials=" + encodeURIComponent(JSON.stringify(serializedCredentials));
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