import type { ISerializableRequest } from "../iserializablerequest";
export declare class UpdateHiveVaultAddressRequest implements ISerializableRequest {
    private vaultAddress;
    private displayName;
    constructor(vaultAddress: string, displayName: string);
    getPayload(): string;
}
