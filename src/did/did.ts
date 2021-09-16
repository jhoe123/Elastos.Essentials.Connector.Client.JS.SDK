import { DIDURL, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as SDKDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { SignedData } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
import { walletConnectManager } from "../walletconnect";
import { AppIDCredentialRequest } from "./appidcredentialrequest";
import { DeleteCredentialsRequest } from "./deletecredentialsrequest";
import { GetCredentialsRequest } from "./getcredentialsrequest";
import { ImportCredentialsRequest } from "./importcredentialsrequest";
import { SignDataRequest } from "./signdatarequest";

export class DID {
    static getCredentials(query: any): Promise<VerifiablePresentation> {
        return new Promise((resolve) => {
            walletConnectManager.ensureConnectedToEssentials(async () => {
                let request = new GetCredentialsRequest(query);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result || !response.result.presentation) {
                    console.warn("Missing presentation. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                let presentationJson = JSON.stringify(response.result.presentation);
                //console.log("Presentation as JSON string:", presentationJson);
                let presentation = VerifiablePresentation.parse(presentationJson);
                resolve(presentation);
            }, () => {
                resolve(null);
            });
        });
    }

    static importCredentials(credentials: VerifiableCredential[], options?: SDKDID.ImportCredentialOptions): Promise<SDKDID.ImportedCredential[]> {
        return new Promise((resolve) => {
            walletConnectManager.ensureConnectedToEssentials(async () => {
                let request = new ImportCredentialsRequest(credentials, options);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result || !response.result.importedcredentials || !(response.result.importedcredentials instanceof Array)) {
                    console.warn("Missing result data. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                let importedCredentials: SDKDID.ImportedCredential[];
                importedCredentials = (response.result.importedcredentials as string[]).map(credentialUrl => {
                    return {
                        id: DIDURL.from(credentialUrl)
                    }
                });
                console.log("Imported credentials:", importedCredentials);
                resolve(importedCredentials);
            }, () => {
                resolve(null);
            });
        });
    }

    static async deleteCredentials(credentialIds: string[]): Promise<string[]> {
        return new Promise((resolve) => {
            walletConnectManager.ensureConnectedToEssentials(async () => {
                let request = new DeleteCredentialsRequest(credentialIds);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result || !response.result.deletedcredentialsids || !(response.result.deletedcredentialsids instanceof Array)) {
                    console.warn("Missing result data. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                console.log("Deleted credentials IDs:", response.result.deletedcredentialsids);
                resolve(response.result.deletedcredentialsids);
            }, () => {
                resolve(null);
            });
        });
    }

    static async signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SignedData> {
        return new Promise((resolve) => {
            walletConnectManager.ensureConnectedToEssentials(async () => {
                let request = new SignDataRequest(data, jwtExtra, signatureFieldName);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result) {
                    console.warn("Missing result data. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                let signedData: SDKDID.SignedData = {
                    signingDID: response.result.iss,
                    publicKey: response.result.publickey,
                    signature: response.result[signatureFieldName],
                    jwtResponse: response.responseJWT
                };

                console.log("Signed data:", signedData);
                resolve(signedData);
            }, () => {
                resolve(null);
            });
        });
    }

    static generateAppIDCredential(appInstanceDID: string, appDID: string): Promise<any> {
        console.log("Essentials: app ID Credential generation flow started");

        return new Promise((resolve) => {
            walletConnectManager.ensureConnectedToEssentials(async () => {
                let request = new AppIDCredentialRequest(appInstanceDID, appDID);
                let response: any = await walletConnectManager.sendCustomRequest(request.getPayload());

                if (!response || !response.result) {
                    console.warn("Missing result data. The operation was maybe cancelled.", response);
                    resolve(null);
                    return;
                }

                let credential = await VerifiableCredential.parse(response.result.credential);

                console.log("App ID credential returned by Essentials:", credential);
                resolve(credential);
            }, () => {
                resolve(null);
            });
        });

        return new Promise(async (resolve, reject) => {
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