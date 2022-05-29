<template>
	<v-container>
		<v-sheet
			class="d-flex"
		>
			<v-btn
				icon
				class="ma-2"
				@click="$refs.calendar.prev()"
			>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<v-spacer />
			<v-btn
				icon
				class="ma-2"
				@click="$refs.calendar.next()"
			>
				<v-icon>mdi-chevron-right</v-icon>
			</v-btn>
		</v-sheet>
		<v-sheet>
			<v-calendar
				ref="calendar"
				v-model="value"
				:weekdays="[1, 2, 3, 4, 5, 6, 0]"
				:events="events"
			/>
		</v-sheet>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { CalendarEvent } from "vuetify"

	import { Event } from "@svindicium/components/api/models/event"

	import { Namespaces } from "~/store/configuration"
	import { EVENT_GETTERS } from "~/store/event"

	const eventModule = namespace(Namespaces.EVENT)

	@Component
	export default class CalendarView extends Vue {
		@eventModule.Getter(EVENT_GETTERS.ALL_EVENTS) allEvents!: Array<Event>

		value = ""

		get events(): Array<CalendarEvent> {
			return this.allEvents.map(event => ({
				name: event.title,
				start: event.startDateTime,
				end: event.endDateTime
			}))
		}
	}
</script>

<style lang="scss" scoped>

</style>
