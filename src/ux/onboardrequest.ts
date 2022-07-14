import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class OnBoardRequest implements ISerializableRequest {
    constructor(private feature: string, private title: string, private introduction: string, private button: string) {
    }

    getPayload(): string {
        let payload = "https://essentials.elastos.net/onboard";
        payload += "?feature=" + encodeURIComponent(this.feature);

        if (this.title)
            payload += "&title=" + encodeURIComponent(this.title);

        if (this.introduction)
            payload += "&introduction=" + encodeURIComponent(this.introduction);

        if (this.button)
            payload += "&button=" + encodeURIComponent(this.button);

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller);

        return payload;
    }
}