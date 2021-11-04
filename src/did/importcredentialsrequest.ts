import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";

export class ImportCredentialsRequest implements ISerializableRequest {
    constructor(private credentials: VerifiableCredential[], private options?: DID.ImportCredentialOptions) {
    }

    getPayload(): string {
        let serializedCredentials = this.credentials.map(c => c.toString());

        let payload = "https://did.elastos.net/credimport";
        payload += "?credentials=" + encodeURIComponent(JSON.stringify(serializedCredentials));
        if (this.options) {
            if (this.options.forceToPublishCredentials)
                payload += "&forceToPublishCredentials";
        }
        return payload;
    }
}