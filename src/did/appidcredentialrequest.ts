import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class AppIDCredentialRequest implements ISerializableRequest {
    constructor(private appInstanceDID: string, private appDID: string) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/appidcredissue";
        payload += "?appinstancedid=" + encodeURIComponent(this.appInstanceDID);
        payload += "&appdid=" + encodeURIComponent(this.appDID); // Application we want the app id credential for (eg: access the hive vault of this app)

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller); // Client application making this call (usually the same as the appdid but could be different)

        return payload;
    }
}