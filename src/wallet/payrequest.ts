import { PayQuery } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
import type { ISerializableRequest } from "../iserializablerequest";

export class PayRequest implements ISerializableRequest {
    constructor(private query: PayQuery) {
    }

    getPayload(): string {
        let payload = "https://wallet.elastos.net/pay";
        payload += "?receiver="+this.query.receiver;
        payload += "&amount="+this.query.amount;

        if (this.query.currency)
            payload += "&currency="+this.query.currency;

            if (this.query.memo)
            payload += "&memo="+this.query.memo;

        return payload;
    }
}