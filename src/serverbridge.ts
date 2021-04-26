import * as Rx from "rxjs";
import type { ISerializableRequest } from "./iserializablerequest";
import { tokenStore } from "./tokenstore";
import { uiHandler } from "./ui/uihandler";

export const enum CommandType {
    // Send
    SendRequestToEssentials = "sendrequesttoessentials", // Client SDK wants to send an intent request to essentials
    Connect = "connect", // Essentials wants to initiate a connection by scanning a essentialsconnect:// qr code

    // Received
    ConnectionTokenNeedsRenewal = "connectiontokenneedsrenewal", // Server wants client SDK to restart a new connection flow with a new connection token
    ConnectedToEssentials = "connectedtoessentials", // Essentials has processed the connection step and is now bound with websockets and connection token.
    EssentialsIntentResponse = "essentialsintentresponse" // Server sends Essentials' intent response to client SDK
}

export type Command = {
  command: any;
  connectionToken?: string;
  data?: any;
}

type ConnectionTokenNeedsRenewalParams = {
    token: string;
    connectUrl: string;
}

type ConnectedToEssentialsParams = {
    token: string;
}

class ServerBridge {
    private ws: WebSocket;
    private subject: Rx.Subject<Command>;
    private pendingRequestResolver: (value: any)=>void = null;

    public async sendRequest(connectionToken: string, request: ISerializableRequest) {
        return new Promise(async (resolve, reject)=>{
            this.pendingRequestResolver = resolve;

            console.log("sendRequest", request.getPayload());
            await this.connect();

            if (this.ws.readyState === WebSocket.OPEN) {
              let command = {
                  command: CommandType.SendRequestToEssentials,
                  connectionToken,
                  data: {
                      intentUrl: request.getPayload()
                  }
              };
              console.log("Command sent:", command);
              this.ws.send(JSON.stringify(command));
            }
            else {
                console.error("WS NOT READY");
            }
        });
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject)=>{
            if (!this.subject || this.ws.readyState != WebSocket.OPEN) {
                this.subject = this.createWebSocketConnection();

                this.ws.addEventListener("open", ()=>{
                    console.log("Successfully connected to connectivity SDK websocket server");
                    resolve();
                });
                this.ws.addEventListener("error", (err)=>{
                    reject(err);
                });
            }
            else {
                resolve();
            }
        });
    }

    private createWebSocketConnection(): Rx.Subject<Command> {
        this.ws = new WebSocket('ws://localhost:6020');

        console.log("Creating websocket connection to the connectivity SDK server");

        let subject = new Rx.Subject<Command>();

        this.ws.addEventListener("message", (ev: MessageEvent)=>{
            console.log("Message received from the connectivity SDK server", ev);
            //subject.next(ev.data); // Unused for now

            let message = ev.data;
            let jsonMessage = JSON.parse(message);
            if ("command" in jsonMessage) {
                this.handleCommand(this.ws, jsonMessage as Command);
            }
            else {
                console.error("Unhandled message received: %s", message);
            }
        });

        return subject;
    }

    private handleCommand(ws: WebSocket, command: Command) {
        switch (command.command) {
            case CommandType.ConnectionTokenNeedsRenewal:
                this.handleConnectionTokenNeedsRenewalCommand(ws, command);
                break;
            case CommandType.EssentialsIntentResponse:
                this.handleEssentialsIntentResponseCommand(ws, command);
                break;
            case CommandType.ConnectedToEssentials:
                this.handleConnectedToEssentialsCommand(ws, command);
                break;
            default:
                console.error("Unknown command type", command.command);
        }
    }

    /**
     * The connection token we are currently using is inexisting or not valid any more.
     * We have to renew it by reconnecting from Essentials.
     */
    private handleConnectionTokenNeedsRenewalCommand(ws: WebSocket, command: Command) {
        console.log("Handling CONNECTION TOKEN NEEDS RENEWAL command", command);
        let params: ConnectionTokenNeedsRenewalParams = command.data;

        // Show "connect" qr code UI
        uiHandler.showRequestEssentialsConnect(params.connectUrl);
    }

    private handleEssentialsIntentResponseCommand(ws: WebSocket, command: Command) {
        console.log("Handling ESSENTIALS INTENT RESPONSE command", command);

        this.pendingRequestResolver(command.data);
    }

    private handleConnectedToEssentialsCommand(ws: WebSocket, command: Command) {
        console.log("Handling CONNECTED TO ESSENTIALS command", command);

         // Save the generated token for future use.
         let params: ConnectedToEssentialsParams = command.data;
         tokenStore.setActiveConnectionToken(params.token);
    }
}

export let serverBridge = new ServerBridge();