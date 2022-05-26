import { ActionTree, GetterTree, MutationTree } from "vuex"

import { RootState } from "~/store/index"
import { SidebarItem } from "~/components/ui/layout"

export enum UI_GETTERS {
    MENU_ITEMS = "MENU_ITEMS"
}

export interface UiState {
}

export const baseState: UiState = {
}

export const getters: GetterTree<UiState, RootState> = {
    [UI_GETTERS.MENU_ITEMS](): Array<SidebarItem> {
        return [
            {
                translationKey: "home",
                icon: "home"
            },
            {
                translationKey: "events",
                icon: "calendar"
            }
        ]
    }
}

export const mutations: MutationTree<UiState> = {}

export const actions: ActionTree<UiState, RootState> = {}
