import type { ActionTree, GetterTree, MutationTree } from "vuex"

import { LoginCredentials } from "@svindicium/components/api/models/authentication"

import { AuthenticationState as AuthState } from "@svindicium/components/api/request"
import { authenticationClient, eventBus, storage } from "@svindicium/components/api"
import { AuthorizedAxiosGateway } from "@svindicium/components/api/request/AuthorizedAxiosGateway"

import { RootState } from "~/store/index"

export enum AUTHENTICATION_GETTERS {
    IS_AUTHENTICATED = "IS_AUTHENTICATED",
    USER_ID = "USER_ID",
    ROLES = "ROLES"
}

export enum AUTHENTICATION_ACTIONS {
    LOGIN = "LOGIN",
    REAUTHENTICATE = "REAUTHENTICATE"
}

export enum AUTHENTICATION_MUTATIONS {
    AUTHENTICATE_WITH_TOKEN = "AUTHENTICATE_WITH_TOKEN"
}

interface TokenPayload {
    sub: string
    nbf: number
    roles: Array<string>
    iss: string
    exp: number
    iat: number
}

interface TokenState {
    expiresAt: Date
    issuedAt: Date
}

export interface AuthenticationState {
    isAuthenticated: boolean
    roles: Array<string>
    userId?: string
    token?: TokenState
}

export const state = (): AuthenticationState => ({
    isAuthenticated: false,
    roles: ["GUEST"],
    userId: undefined,
    token: undefined
})

const getTokenContent = (token: string): TokenPayload => {
    const payload = atob(token.split(".")[1])
    return JSON.parse(payload)
}

const isTokenValid = (token: TokenState): boolean => {
    return token.expiresAt > new Date() && token.issuedAt < new Date()
}

export const getters: GetterTree<AuthenticationState, RootState> = {
    [AUTHENTICATION_GETTERS.IS_AUTHENTICATED]: (state): boolean => state.isAuthenticated,
    [AUTHENTICATION_GETTERS.USER_ID]: (state): string | undefined => state.userId,
    [AUTHENTICATION_GETTERS.ROLES]: (state): Array<string> => state.roles
}

export const mutations: MutationTree<AuthenticationState> = {
    [AUTHENTICATION_MUTATIONS.AUTHENTICATE_WITH_TOKEN]: (state, accessToken: string): void => {
        const tokenPayload: TokenPayload = getTokenContent(accessToken)
        const tokenState: TokenState = { issuedAt: new Date(tokenPayload.iat * 1000), expiresAt: new Date(tokenPayload.exp * 1000) }
        if (isTokenValid(tokenState)) {
            state.token = tokenState
            state.userId = tokenPayload.sub
            state.roles = tokenPayload.roles
            state.isAuthenticated = true

            storage.setItem(AuthorizedAxiosGateway.ACCESS_TOKEN_STORAGE_KEY, accessToken)

            eventBus.$emit(AuthState.ACCESS_GRANTED)
        }
    }
}

export const actions: ActionTree<AuthenticationState, RootState> = {
    async [AUTHENTICATION_ACTIONS.LOGIN]({ commit }, credentials: LoginCredentials): Promise<void> {
        const token = await authenticationClient.login(credentials)
        commit(AUTHENTICATION_MUTATIONS.AUTHENTICATE_WITH_TOKEN, token.access_token)
    },
    [AUTHENTICATION_ACTIONS.REAUTHENTICATE]({ commit }): void {
        const token = storage.getItem(AuthorizedAxiosGateway.ACCESS_TOKEN_STORAGE_KEY)
        commit(AUTHENTICATION_MUTATIONS.AUTHENTICATE_WITH_TOKEN, token)
    }
}
