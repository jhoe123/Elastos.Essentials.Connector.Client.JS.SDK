import { PayQuery } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
import type { ISerializableRequest } from "../iserializablerequest";
export declare class PayRequest implements ISerializableRequest {
    private query;
    constructor(query: PayQuery);
    getPayload(): string;
}
