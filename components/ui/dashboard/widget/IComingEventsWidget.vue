<template>
	<v-col cols="4">
		<v-card class="pa-4">
			<v-card-title>
				{{ `${ baseTranslationKey }.title` | locale }}
			</v-card-title>
			<v-card-text>
				<v-list-item
					v-for="(event, index) in events"
					:key="index"
					two-line
				>
					<v-list-item-content>
						<v-list-item-title>{{ event.title }}</v-list-item-title>
						<v-list-item-subtitle>{{ event.startDateTime | fullDate | capitalize }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { Namespaces } from "~/store/configuration"
	import { EVENT_GETTERS } from "~/store/event"
	import { Event } from "~/api/models/event"

	const eventModule = namespace(Namespaces.EVENT)

	@Component
	export default class IComingEventsWidget extends Vue {
		@eventModule.Getter(EVENT_GETTERS.ALL_EVENTS) events!: Array<Event>

		readonly baseTranslationKey = "layout.dashboard.widgets.comingEvents"
	}
</script>

<style lang="scss" scoped>

</style>
