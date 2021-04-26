import type { IDIDConnectorAPI } from "./ididconnectorapi";

export interface TMPIConnector extends IDIDConnectorAPI {
    name: string;

    /**
     * Returns the connector name to be displayed on UI. This name may be localized for
     * the active language.
     */
    getDisplayName(): Promise<string>;
}