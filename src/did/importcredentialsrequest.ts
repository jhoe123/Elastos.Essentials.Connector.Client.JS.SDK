import { VerifiableCredential } from "@elastosfoundation/did-js-sdk/typings";
import type { ISerializableRequest } from "../iserializablerequest";

export class ImportCredentialsRequest implements ISerializableRequest {
    constructor(private credentials: VerifiableCredential[]) {
    }

    getPayload(): string {
        let serializedCredentials = this.credentials.map(c => c.toString());

        let payload = "https://did.elastos.net/credimport";
        payload += "?credentials=["+ encodeURIComponent(serializedCredentials.join(","))+"]";
        return payload;
    }
}