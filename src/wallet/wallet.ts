import { walletConnectManager } from "../walletconnect";
import { PayQuery, TransactionResult } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/wallet";
import { PayRequest } from "./payrequest";

export class Wallet {
  static pay(query: PayQuery): Promise<TransactionResult> {
    return new Promise((resolve) => {
        walletConnectManager.ensureConnectedToEssentials(async ()=>{
            let request = new PayRequest(query);
            let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

            if (!response || !response.result || !response.result.status) {
                console.warn("Missing response status. The operation was maybe cancelled.", response);
                resolve(null);
                return;
            }

            resolve({
              txId: response.result.txid,
              status: response.result.status
            });
        }, ()=>{
            resolve(null);
        });
    });
  }
}