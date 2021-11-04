import { Wallet as ConnWallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
export declare class Wallet {
    static pay(query: ConnWallet.PayQuery): Promise<ConnWallet.TransactionResult>;
}
