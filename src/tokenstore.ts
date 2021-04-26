class TokenStore {
    private activeConnectionToken: string = null; // Connection token provided by the server when first establishing a link to Essentials.

    public setActiveConnectionToken(token: string | null) {
        this.activeConnectionToken = token;
    }

    public getActiveConnectionToken(): string | null {
        return this.activeConnectionToken;
    }
}

export let tokenStore = new TokenStore();