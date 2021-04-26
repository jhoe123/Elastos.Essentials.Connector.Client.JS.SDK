import { DID } from "./did/did";
import { GetCredentialsRequest } from "./did/getcredentialsrequest";
import type { ServerInfo } from "./model/serverinfo";
import type { TMPIConnector } from "./tmp/connectors/index";
import { uiHandler } from "./ui/uihandler";
import { serverBridge } from "./serverbridge";
import { tokenStore } from "./tokenstore";

export enum LinkType {
    Connected, // Elastos Essentials, website client and website server are connected (3 parties) and intents are sent through web sockets
    Disconnected // Website client sends intents through QR codes, with an optional callbackurl
}

export class EssentialsConnector implements TMPIConnector {
    public name: string = "essentials";

    private linkType: LinkType = LinkType.Disconnected;
    private callbackURL: string = null;
    private serverInfo: ServerInfo = null;

    async getDisplayName(): Promise<string> {
        return "Elastos Essentials";
    }

    public setLinkType(linkType: LinkType) {
        console.log("Setting link type to", linkType);
        this.linkType = linkType;
    }

    /**
     * Sets the callback that receives responses from essentials. In case there is no callback url defined,
     * no response will be received.
     */
    public setCallbackURL(callbackURL: string) {
        console.log("Setting callback url to", callbackURL);
        this.callbackURL = callbackURL;
    }

    public setupServer(serverInfo: ServerInfo) {
        console.log("Setting server info to", serverInfo);
        this.serverInfo = serverInfo;
    }

    /**
     * Method for debug purpose only. This removes the connection token that binds the web client
     * with Essentials. Next call to Essentials will require to "connect" again.
     */
    public unlinkEssentialsDevice() {
        tokenStore.setActiveConnectionToken(null);
    }

    /**
     * DID API
     */

    async getCredentials(query: any): Promise<any> {
        console.log("Get credentials request");

        // TODO:
        // - first implement the disconnected mode to generate direct intents for essentials, without callback url
        // - second, add an api to configure a callback url root and disconnected mode should send callbacks there
        // - third, connected mode: websockets, send and receive intents through WS

        let request = new GetCredentialsRequest(query, this.callbackURL);
        if (this.serverInfo == null || this.linkType == LinkType.Disconnected) {
            // TODO: test the callback url when server is ready

            return uiHandler.showRequestGetCredentials(request);
        }
        else {
            // Connected mode, so we have to:
            // - Try to send the intent to the server (throw error is no server configured)
            // - Listen to the "connection required" server callback and display a connection qr code to be scanned from essentials

            // Connection flow:
            // - qr code with server WS address -> scanned by essentials ->
            // essentials connects to that WS

            await serverBridge.connect();
            return await serverBridge.sendRequest(tokenStore.getActiveConnectionToken(), request);
        }
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        return DID.generateAppIDCredential(appInstanceDID, appDID);
    }
}