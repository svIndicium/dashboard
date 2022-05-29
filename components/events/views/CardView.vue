<template>
	<div />
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"

	import { Event } from "@svindicium/components/api/models/event"

	import { Namespaces } from "~/store/configuration"
	import { EVENT_GETTERS } from "~/store/event"

	const eventModule = namespace(Namespaces.EVENT)

	@Component
	export default class CardView extends Vue {
		@eventModule.Getter(EVENT_GETTERS.ALL_EVENTS) events!: Array<Event>
	}
</script>

<style lang="scss" scoped>

</style>
