import type { ISerializableRequest } from "../iserializablerequest";

export class GetCredentialsRequest implements ISerializableRequest {
    // TODO: use the ready query type with claims, customization
    constructor(private query: any) {
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/credaccess";
        payload += "?claims="+JSON.stringify(this.query.claims);

        // TODO: customization, other params

        return payload;
    }
}