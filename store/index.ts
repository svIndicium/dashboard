import type { ActionTree, GetterTree, MutationTree } from "vuex";

export type StoreMutations<T> = (payload?: T) => void

export type StoreAction<T, R = void> = (payload?: T) => Promise<R>

export interface RootState {
}

export const baseState = {}

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}
