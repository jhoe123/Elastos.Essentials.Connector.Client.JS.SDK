import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class ImportCredentialContextRequest implements ISerializableRequest {
    constructor(private serviceName: string, private credentialContextCredential: VerifiableCredential) {
    }

    getPayload(): string {
        // VC is converted to clear json strings then back to clean JSON objects again
        let serializedCredential = JSON.parse(this.credentialContextCredential.toString());

        let payload = "https://did.elastos.net/credcontextimport";
        payload += "?serviceName=" + encodeURIComponent(this.serviceName);
        payload += "&credential=" + encodeURIComponent(JSON.stringify(serializedCredential));

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}