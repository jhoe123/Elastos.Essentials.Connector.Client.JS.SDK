import type { ISerializableRequest } from "../iserializablerequest";

export class AppIDCredentialRequest implements ISerializableRequest {
    constructor(private appInstanceDID: string, private appDID: string) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/appidcredissue";
        payload += "?appinstancedid=" + encodeURIComponent(this.appInstanceDID);
        payload += "&appdid=" + encodeURIComponent(this.appDID);

        return payload;
    }
}