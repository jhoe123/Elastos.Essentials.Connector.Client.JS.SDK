import { JSONObject, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID, Interfaces, Wallet } from "@elastosfoundation/elastos-connectivity-sdk-js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import type { provider } from "web3-core";
import { DID as ConnDID } from "./did/did";
import { UX } from "./ux/ux";
import { Wallet as ConnWallet } from "./wallet/wallet";
import { walletConnectManager } from "./walletconnect";

export class EssentialsConnector implements Interfaces.Connectors.IConnector {
    public name: string = "essentials";

    private callbackURL: string = null;

    async getDisplayName(): Promise<string> {
        return "Elastos Essentials";
    }

    getWeb3Provider(): provider {
        return walletConnectManager.getWalletConnectProvider() as any;
    }

    /**
     * Tells whether a wallet connect session exists on disk or not, not matter if it's connected
     * or not.
     */
    public hasWalletConnectSession(): boolean {
        return walletConnectManager.hasWalletConnectSession();
    }

    /**
     * Disconnects the active wallet connect session if any, and deletes any session from disk
     * in order to refresh start. This helps solving bad link states between dapps and wallets.
     */
    public disconnectWalletConnect(): Promise<void> {
        return walletConnectManager.disconnectWalletConnect();
    }

    /**
     * Force using an external WC provider instead of the one created by the essentials connector.
     * Calling this api is neede only in case the application already has its own provider and needs
     * to share it with this connector.
     */
    public setWalletConnectProvider(provider: WalletConnectProvider) {
        walletConnectManager.useWalletConnectProvider(provider);
    }

    public getWalletConnectProvider(): WalletConnectProvider {
        return walletConnectManager.getWalletConnectProvider();
    }

    /**
     * DID API
     */
    getCredentials(query: any): Promise<any> {
        return ConnDID.getCredentials(query);
    }

    requestCredentials(request: DID.CredentialDisclosureRequest): Promise<VerifiablePresentation> {
        return ConnDID.requestCredentials(request);
    }

    issueCredential(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential> {
        return ConnDID.issueCredential(holder, types, subject, identifier, expirationDate);
    }

    importCredentials(credentials: VerifiableCredential[], options?: DID.ImportCredentialOptions): Promise<DID.ImportedCredential[]> {
        return ConnDID.importCredentials(credentials, options);
    }

    deleteCredentials(credentialIds: string[], options?: DID.DeleteCredentialOptions): Promise<string[]> {
        return ConnDID.deleteCredentials(credentialIds, options);
    }

    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<DID.SignedData> {
        return ConnDID.signData(data, jwtExtra, signatureFieldName);
    }

    requestPublish(): Promise<string> {
        return ConnDID.requestPublish();
    }

    updateHiveVaultAddress(vaultAddress: string, displayName: string): Promise<DID.UpdateHiveVaultAddressStatus> {
        return ConnDID.updateHiveVaultAddress(vaultAddress, displayName);
    }

    importCredentialContext(serviceName: string, contextCredential: VerifiableCredential): Promise<DID.ImportedCredential> {
        return ConnDID.importCredentialContext(serviceName, contextCredential);
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<any> {
        return ConnDID.generateAppIDCredential(appInstanceDID, appDID);
    }

    generateHiveBackupCredential?(sourceHiveNodeDID: string, targetHiveNodeDID: string, targetNodeURL: string): Promise<VerifiableCredential> {
        return ConnDID.generateHiveBackupCredential(sourceHiveNodeDID, targetHiveNodeDID, targetNodeURL);
    }

    pay(query: any): Promise<Wallet.TransactionResult> {
        return ConnWallet.pay(query);
    }

    voteForDPoS(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    voteForCRCouncil(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    voteForCRProposal(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    sendSmartContractTransaction(payload: any): Promise<string> {
        throw new Error("Method not implemented.");
    }

    /**
     * UI API
     */
    onBoard(feature: string, title: string, introduction: string, button: string) {
        return UX.onBoard(feature, title, introduction, button);
    }
}