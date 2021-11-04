import { Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class PayRequest implements ISerializableRequest {
    private query;
    constructor(query: Wallet.PayQuery);
    getPayload(): string;
}
