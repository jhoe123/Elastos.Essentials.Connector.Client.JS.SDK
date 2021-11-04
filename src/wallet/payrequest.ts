import { Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { ISerializableRequest } from "../iserializablerequest";

export class PayRequest implements ISerializableRequest {
    constructor(private query: Wallet.PayQuery) {
    }

    getPayload(): string {
        let payload = "https://wallet.elastos.net/pay";
        payload += "?receiver=" + this.query.receiver;
        payload += "&amount=" + this.query.amount;

        if (this.query.currency)
            payload += "&currency=" + this.query.currency;

        if (this.query.memo)
            payload += "&memo=" + encodeURIComponent(this.query.memo);

        return payload;
    }
}