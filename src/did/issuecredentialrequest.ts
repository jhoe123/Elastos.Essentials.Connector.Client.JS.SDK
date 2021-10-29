import { JSONObject } from "@elastosfoundation/did-js-sdk";
import moment from "moment";
import type { ISerializableRequest } from "../iserializablerequest";

export class IssueCredentialRequest implements ISerializableRequest {
    constructor(
        private holder: string,
        private types: string[],
        private subject: JSONObject,
        private identifier?: string,
        private expirationDate?: string
    ) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/credissue";
        payload += "?subjectdid=" + encodeURIComponent(this.holder);
        if (this.identifier)
            payload += "&identifier=" + encodeURIComponent(this.identifier);
        if (this.types)
            payload += "&types=" + encodeURIComponent(JSON.stringify(this.types));
        payload += "&properties=" + encodeURIComponent(JSON.stringify(this.subject));

        if (this.expirationDate)
            payload += "&expirationDate=" + encodeURIComponent(this.expirationDate);
        else // Default expiration if none given: 5 years.
            payload += "&expirationDate=" + encodeURIComponent(moment().add(5, "years").toISOString());

        return payload;
    }
}