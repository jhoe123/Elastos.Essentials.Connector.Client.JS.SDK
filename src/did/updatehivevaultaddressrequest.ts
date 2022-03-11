import type { ISerializableRequest } from "../iserializablerequest";

export class UpdateHiveVaultAddressRequest implements ISerializableRequest {
    constructor(
        private vaultAddress: string,
        private displayName: string
    ) { }

    getPayload(): string {
        let payload = "https://did.elastos.net/sethiveprovider";
        payload += "?address=" + encodeURIComponent(this.vaultAddress);
        payload += "&displayName=" + encodeURIComponent(this.displayName);

        return payload;
    }
}