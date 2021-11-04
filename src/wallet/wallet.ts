import { Wallet as ConnWallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { walletConnectManager } from "../walletconnect";
import { PayRequest } from "./payrequest";

export class Wallet {
  static pay(query: ConnWallet.PayQuery): Promise<ConnWallet.TransactionResult> {
    return new Promise((resolve, reject) => {
      walletConnectManager.ensureConnectedToEssentials(async () => {
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
      }, () => {
        resolve(null);
      }).catch(e => {
        reject(e);
      });
    });
  }
}