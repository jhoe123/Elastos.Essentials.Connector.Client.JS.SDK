import { walletConnectManager } from "../walletconnect";
import { OnBoardRequest } from "./onboardrequest";

export class UX {
  static onBoard(feature: string, title: string, introduction: string, button: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      walletConnectManager.ensureConnectedToEssentials(async (didPhysicalConnection) => {
        walletConnectManager.prepareSigningMethods(didPhysicalConnection);

        let request = new OnBoardRequest(feature, title, introduction, button);
        let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

        if (!response) {
          resolve(); // No matter if there is a response or not, no return value expected for now.
          return;
        }

        resolve();
      }, () => {
        resolve(null);
      }).catch(e => {
        reject(e);
      });
    });
  }
}