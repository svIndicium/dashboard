import type { ActionTree, GetterTree, MutationTree } from "vuex"
import { User } from "~/api/models/user"
import { RootState } from "~/store/index"

export enum USER_GETTERS {
    FIRST_NAME = "FIRST_NAME",
    LAST_NAME = "LAST_NAME",
    FULL_NAME = "FULL_NAME",
    BIRTHDATE = "BIRTHDATE",
    AGE = "AGE"
}

export interface UserState extends User {
}

export const state = (): UserState => ({
    name: {
        firstName: "Joost",
        infix: undefined,
        lastName: "Lekkerkerker"
    },
    birthdate: new Date()
})

export const getters: GetterTree<UserState, RootState> = {
    [USER_GETTERS.FIRST_NAME]: state => state.name.firstName,
    [USER_GETTERS.LAST_NAME]: state => `${state.name.infix ?? ""} ${state.name.lastName}`.trim(),
    [USER_GETTERS.FULL_NAME]: (_state, getters) => `${getters[USER_GETTERS.FIRST_NAME]} ${getters[USER_GETTERS.LAST_NAME]}`,
    [USER_GETTERS.BIRTHDATE]: state => state.birthdate,
    [USER_GETTERS.AGE]: (_state): number => 18
}

export const mutations: MutationTree<UserState> = {}

export const actions: ActionTree<UserState, RootState> = {}
