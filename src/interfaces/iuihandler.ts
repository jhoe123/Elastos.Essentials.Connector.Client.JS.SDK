import type { GetCredentialsRequest } from "../did/getcredentialsrequest";

export interface IUIHandler {
    showRequestGetCredentials(request: GetCredentialsRequest): Promise<any>;
    showRequestEssentialsConnect(connectUrl: string): Promise<any>;
}