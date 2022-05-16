import type { ActionTree, GetterTree, MutationTree } from "vuex";
import {RootState} from "~/store/index";

import { Event } from "~/api/models/event"

export enum EVENT_GETTERS {
    ALL_EVENTS = "ALL_EVENTS"
}

export interface EventState {
    events: Array<Event>
}

export const state = (): EventState => ({
    events: [
        {
            title: "test",
            slug: "test",
            startDateTime: new Date(),
            endDateTime: new Date()
        }
    ]
})

export const getters: GetterTree<EventState, RootState> = {
    [EVENT_GETTERS.ALL_EVENTS]: (state): Array<Event> => state.events
}

export const mutations: MutationTree<EventState> = {}

export const actions: ActionTree<EventState, RootState> = {}
