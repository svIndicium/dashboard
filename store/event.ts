import type { ActionTree, GetterTree, MutationTree } from "vuex"

import { Event } from "@svindicium/components/api/models/event"

import { eventClient } from "@svindicium/components/api"

import { RootState } from "~/store/index"

export enum EVENT_GETTERS {
    ALL_EVENTS = "ALL_EVENTS",
    SELECTED_EVENT = "SELECTED_EVENT"
}

export enum EVENT_MUTATIONS {
    STORE_EVENTS = "STORE_EVENTS",
    STORE_EVENT = "STORE_EVENT",
    SELECT_EVENT = "SELECT_EVENT"
}

export enum EVENT_ACTIONS {
    GET_ALL_EVENTS = "GET_ALL_EVENTS",
    CREATE_EVENT = "CREATE_EVENT",
    SELECT_EVENT = "SELECT_EVENT"
}

export interface EventState {
    selectedEvent?: string,
    events: Array<Event>
}

export const state = (): EventState => ({
    selectedEvent: undefined,
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
    [EVENT_GETTERS.ALL_EVENTS]: (state): Array<Event> => state.events,
    [EVENT_GETTERS.SELECTED_EVENT]: (state): Event | undefined => state.events.find(event => event.slug === state.selectedEvent)
}

export const mutations: MutationTree<EventState> = {
    [EVENT_MUTATIONS.STORE_EVENTS]: (state, events: Array<Event>): void => {
        state.events = events
    },
    [EVENT_MUTATIONS.STORE_EVENT]: (state, event: Event): void => {
        state.events.push(event)
    },
    [EVENT_MUTATIONS.SELECT_EVENT]: (state, slug: string): void => {
        state.selectedEvent = slug
    }
}

export const actions: ActionTree<EventState, RootState> = {
    async [EVENT_ACTIONS.GET_ALL_EVENTS]({ commit }): Promise<void> {
        const events = await eventClient.getAllEvents()
        commit(EVENT_MUTATIONS.STORE_EVENTS, events)
    },
    async [EVENT_ACTIONS.CREATE_EVENT]({ commit }, newEvent: Event): Promise<void> {
        const event = await eventClient.createEvent(newEvent)
        commit(EVENT_MUTATIONS.STORE_EVENT, event)
    },
    [EVENT_ACTIONS.SELECT_EVENT]({ commit }, slug: string): void {
        commit(EVENT_MUTATIONS.SELECT_EVENT, slug)
    }
}
