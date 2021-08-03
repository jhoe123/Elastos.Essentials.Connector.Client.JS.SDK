import { PayQuery, TransactionResult } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
export declare class Wallet {
    static pay(query: PayQuery): Promise<TransactionResult>;
}
