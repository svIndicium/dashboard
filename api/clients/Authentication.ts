import { EndGateway } from "~/api/request/EndGateway"
import { LoginCredentials, Token } from "~/api/models/authentication"

export class AuthenticationClient {
    static readonly NAME = "authenticationClient"

    static readonly ACCESS_TOKEN_STORAGE_KEY = "access_token"

    private readonly authenticationRootUrl!: string

    constructor(private readonly gateway: EndGateway) {
        if (process.server) {
            return
        }

        this.authenticationRootUrl = global.apiConfig?.authenticationRootUrl!
    }

    async login(credentials: LoginCredentials): Promise<Token> {
        const response = await this.gateway.postOpen(`${this.authenticationRootUrl}/login`, credentials)

        return await response.data
    }
}
