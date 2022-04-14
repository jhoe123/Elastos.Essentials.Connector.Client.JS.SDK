import type { ISerializableRequest } from "../iserializablerequest";
import { getSafeApplicationDID } from "../utils";

export class HiveBackupCredentialRequest implements ISerializableRequest {
    constructor(private sourceHiveNodeDID: string, private targetHiveNodeDID: string, private targetNodeURL: string) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/hivebackupcredissue";
        payload += "?sourceHiveNodeDID=" + encodeURIComponent(this.sourceHiveNodeDID);
        payload += "&targetHiveNodeDID=" + encodeURIComponent(this.targetHiveNodeDID);
        payload += "&targetNodeURL=" + encodeURIComponent(this.targetNodeURL);

        let caller = getSafeApplicationDID();
        if (caller)
            payload += "&caller=" + encodeURIComponent(caller); // Client application making this call (not verified)

        return payload;
    }
}

export type HiveBackupCredentialResponse = {
    result: {
        credential?: string;
    }
}