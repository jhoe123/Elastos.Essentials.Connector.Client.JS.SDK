import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";

export class ImportCredentialsRequest implements ISerializableRequest {
    constructor(private credentials: VerifiableCredential[], private options?: DID.ImportCredentialOptions) {
    }

    getPayload(): string {
        // VCs converted to clear json strings then back to clen JSON objects again
        let serializedCredentials = this.credentials.map(c => JSON.parse(c.toString()));

        let payload = "https://did.elastos.net/credimport";
        payload += "?credentials=" + encodeURIComponent(JSON.stringify(serializedCredentials));
        if (this.options) {
            if (this.options.forceToPublishCredentials)
                payload += "&forceToPublishCredentials";
        }
        return payload;
    }
}