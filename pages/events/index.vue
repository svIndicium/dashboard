<template>
	<div>
		<CalendarView></CalendarView>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"

	import { Event } from "@svindicium/components/api/models/event"

	import CalendarView from "~/components/events/views/CalendarView.vue"
	import { Namespaces } from "~/store/configuration"
	import { EVENT_GETTERS } from "~/store/event"

	const eventModule = namespace(Namespaces.EVENT)
	@Component({
		components: { CalendarView }
	})
	export default class EventsIndex extends Vue {
		@eventModule.Getter(EVENT_GETTERS.ALL_EVENTS) events!: Array<Event>
	}
</script>

<style lang="scss" scoped>

</style>
