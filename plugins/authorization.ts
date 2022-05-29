import { Store } from "vuex"

import { Context } from "@nuxt/types"

import { eventBus, storage } from "@svindicium/components/api"
import { AuthenticationState } from "@svindicium/components/api/request"
import { AuthorizedAxiosGateway } from "@svindicium/components/api/request/AuthorizedAxiosGateway"

import { isNull } from "lodash-es"

import { Namespaces } from "~/store/configuration"
import { EVENT_ACTIONS } from "~/store/event"
import { AUTHENTICATION_ACTIONS } from "~/store/authentication"

const modules: { [key: string]: (store: Store<any>) => Promise<void>} = {
  [Namespaces.EVENT]: async (store) => {
	await store.dispatch(`${ Namespaces.EVENT}/${ EVENT_ACTIONS.GET_ALL_EVENTS }`)
  }
}

export default ({ store }: Context): void => {
  eventBus.$on(AuthenticationState.ACCESS_GRANTED, async () => {
	const promises = Object.keys(modules).map(async (key) => {
	  try {
		await modules[key](store)
	  } catch (e) {
		// whoops
	  }
	})

	await Promise.all(promises)
  })
  if (!isNull(storage.getItem(AuthorizedAxiosGateway.ACCESS_TOKEN_STORAGE_KEY))) {
	store.dispatch((`${ Namespaces.AUTHENTICATION }/${ AUTHENTICATION_ACTIONS.REAUTHENTICATE }`)).then()
  }
}
