import ModalContainer from "../ui/components/ModalContainer.svelte";
import Root from './pages/Root.svelte';
import type { IUIHandler } from "../interfaces/iuihandler";
import { ViewType } from "./viewtype";
import { navService } from "./nav.service";
import type { GetCredentialsRequest } from "../did/getcredentialsrequest";
import type { GetCredentialsNavParams } from "./navparams/getcredentials";
import type { EssentialsConnectNavParams } from "./navparams/essentialsconnect";

class UIHandler implements IUIHandler {
    private localIdentityModalShown = false;
    private genericModalContainer = new ModalContainer({
        target: document.body
    });

    constructor() {
    }

    private async showRootComponentInModal(onPopupClosed?: ()=>void): Promise<void> {
        return new Promise((resolve)=>{
            if (!this.localIdentityModalShown) {
                this.genericModalContainer.show(Root, {
                }, {
                    onOpen: () => {
                        this.localIdentityModalShown = true
                        resolve();
                    },
                    onClosed: ()=>{
                        this.localIdentityModalShown = false;
                        if (onPopupClosed)
                            onPopupClosed();
                    }
                });
            }
            else {
                // Nothing to do
                resolve();
            }
        });
    }

    async showRequestGetCredentials(request: GetCredentialsRequest): Promise<any> {
        return new Promise<void>(async (resolve)=>{
            await this.showRootComponentInModal();
            navService.navigateTo(ViewType.Main, {
                request: request
            } as GetCredentialsNavParams);
        });
    }

    async showRequestEssentialsConnect(connectUrl: string): Promise<any> {
        return new Promise<void>(async (resolve)=>{
            await this.showRootComponentInModal();
            navService.navigateTo(ViewType.EssentialsConnect, {
                connectUrl
            } as EssentialsConnectNavParams);
        });
    }
}

export const uiHandler = new UIHandler();