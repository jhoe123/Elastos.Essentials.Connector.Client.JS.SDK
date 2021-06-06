import { walletConnectManager } from "../walletconnect";
import { GetCredentialsRequest } from "./getcredentialsrequest";
import { VerifiablePresentation } from "@elastosfoundation/did-js-sdk";

export class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation> {
        return new Promise((resolve) => {
            walletConnectManager.ensureConnected(async ()=>{
                let request = new GetCredentialsRequest(query);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result || !response.result.presentation) {
                    console.warn("Missing presentation. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                let presentationJson = JSON.stringify(response.result.presentation);
                //console.log("Presentation as JSON string:", presentationJson);
                let presentation = VerifiablePresentation.parseContent(presentationJson);
                resolve(presentation);
            }, ()=>{
                resolve(null);
            });
        });
    }

    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any> {
        console.log("Essentials: app ID Credential generation flow started");

        return new Promise(async (resolve, reject)=>{
            try {
                // No such credential, so we have to create one. Send an intent to get that from the did app
                /*let res: { result: { credential: string } } = await intentPlugin.sendIntent("https://did.elastos.net/appidcredissue", {
                    appinstancedid: appInstanceDID,
                    appdid: appDID
                });

                console.log("Got response for the appidcredissue intent", res);

                if (!res || !res.result || !res.result.credential) {
                    console.warn("Missing credential information. The operation was maybe cancelled.");
                    resolve(null);
                    return;
                }
                let credential = didManager.VerifiableCredentialBuilder.fromJson(res.result.credential);
                resolve(credential);*/
            }
            catch (err) {
                console.error("generateAppIDCredential() error:", err);
                resolve(null);
            }
        });
    }
}