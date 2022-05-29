import type { ActionTree, GetterTree, MutationTree } from "vuex"

import { Event } from "@svindicium/components/api/models/event"

import { eventClient } from "@svindicium/components/api"

import { RootState } from "~/store/index"

export enum EVENT_GETTERS {
    ALL_EVENTS = "ALL_EVENTS"
}

export enum EVENT_MUTATIONS {
    STORE_EVENTS = "STORE_EVENTS"
}

export enum EVENT_ACTIONS {
    GET_ALL_EVENTS = "GET_ALL_EVENTS"
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

export const mutations: MutationTree<EventState> = {
    [EVENT_MUTATIONS.STORE_EVENTS]: (state, events: Array<Event>): void => {
        state.events = events
    }
}

export const actions: ActionTree<EventState, RootState> = {
    async [EVENT_ACTIONS.GET_ALL_EVENTS]({ commit }): Promise<void> {
        const events = await eventClient.getAllEvents()
        commit(EVENT_MUTATIONS.STORE_EVENTS, events)
    }
}
