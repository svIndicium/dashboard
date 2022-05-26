import type { ActionTree, GetterTree, MutationTree } from "vuex"
import { LoginCredentials } from "@svindicium/indicium-components/api/models/authentication"
import { authenticationClient } from "@svindicium/indicium-components/api"
import { RootState } from "~/store/index"

export enum AUTHENTICATION_GETTERS {
}

export enum AUTHENTICATION_ACTIONS {
    LOGIN = "LOGIN"
}

export enum AUTHENTICATION_MUTATIONS {
}

export interface AuthenticationState {
    isAuthenticated: boolean
}

export const state = (): AuthenticationState => ({
    isAuthenticated: false
})

export const getters: GetterTree<AuthenticationState, RootState> = {
}

export const mutations: MutationTree<AuthenticationState> = {}

export const actions: ActionTree<AuthenticationState, RootState> = {
    async [AUTHENTICATION_ACTIONS.LOGIN](_, credentials: LoginCredentials): Promise<void> {
        await authenticationClient.login(credentials)
    }
}
