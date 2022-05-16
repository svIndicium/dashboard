export interface LoginCredentials {
    username: string
    password: string
}

export interface Token {
    username: string
    roles: Array<string>
    access_token: string
    token_type: string
    expires_in: string
}
