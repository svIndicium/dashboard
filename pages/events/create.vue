<template>
	<v-container>
		<i-text-input
			v-model="state.title"
			:disabled="loading"
			:errors="errors"
			:show-errors="touchedState.title"
			field-name="title"
			@input="setSlug"
			@blur="touch('title')"
		>
			{{ `${ baseTranslationKey }.title` | locale }}
		</i-text-input>
		<i-text-input
			v-model="state.description"
			:disabled="loading"
			:errors="errors"
			:show-errors="touchedState.description"
			field-name="description"
			@blur="touch('description')"
		>
			{{ `${ baseTranslationKey }.description` | locale }}
		</i-text-input>
		<i-text-input
			v-model="state.slug"
			:disabled="loading"
			:errors="errors"
			:show-errors="touchedState.slug"
			field-name="slug"
			@blur="touch('slug')"
		>
			{{ `${ baseTranslationKey }.slug` | locale }}
		</i-text-input>
		<i-date-time-input
			v-model="state.startDateTime"
			:disabled="loading"
			:errors="errors"
			:show-errors="touchedState.startDateTime"
			field-name="startDateTime"
			@blur="touch('startDateTime')"
		>
			{{ `${ baseTranslationKey }.startDateTime` | locale }}
		</i-date-time-input>
		<i-date-time-input
			v-model="state.endDateTime"
			:disabled="loading"
			:errors="errors"
			:show-errors="touchedState.endDateTime"
			field-name="endDateTime"
			@blur="touch('endDateTime')"
		>
			{{ `${ baseTranslationKey }.endDateTime` | locale }}
		</i-date-time-input>
		<i-button
			:disabled="hasErrors"
			primary
			@click="saveEvent"
		>
			{{ "general.save" | locale }}
		</i-button>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { Watch } from "vue-property-decorator"

	import validator from "@svindicium/lib/validation/validator"
	import { ObjectErrors, ObjectRules } from "@svindicium/lib/validation"
	import { TouchedState } from "@svindicium/lib/types/forms"

	import { Event } from "@svindicium/components/api/models/event"

	import { eventClient } from "@svindicium/components/api"

	import IButton from "@svindicium/components/ui/IButton.vue"
	import ITextInput from "@svindicium/components/ui/input/ITextInput.vue"
	import IDateTimeInput from "@svindicium/components/ui/input/IDateTimeInput.vue"

	import { isNull } from "lodash-es"

	import { Namespaces } from "~/store/configuration"
	import { EVENT_ACTIONS } from "~/store/event"
	import { StoreAction } from "~/store"

	const eventModule = namespace(Namespaces.EVENT)

	@Component({
		components: {
			ITextInput,
			IDateTimeInput,
			IButton
		}
	})
	export default class CreateEvent extends Vue {
		@eventModule.Action(EVENT_ACTIONS.GET_ALL_EVENTS) getAllEvents!: StoreAction<void>

		readonly baseTranslationKey = "pages.events.create"

		loading = false

		state: Event = {
			title: "",
			description: "",
			slug: "",
			startDateTime: new Date(),
			endDateTime: new Date()
		}

		errors: ObjectErrors<Event> | null = null

		touchedState: TouchedState<Event> = {
			description: false,
			endDateTime: false,
			slug: false,
			startDateTime: false,
			title: false
		}

		get validationRules(): ObjectRules<Event> {
			return {
				title: {
					required: true,
					maxlength: 100
				},
				description: {
					required: false,
					maxlength: 100
				},
				slug: {
					required: true,
					maxlength: 100
				},
				startDateTime: {
					required: true,
					minimum: new Date()
				},
				endDateTime: {
					required: true,
					minimum: this.state.startDateTime
				}
			}
		}

		get hasErrors(): boolean {
			return !isNull(this.errors)
		}

		setSlug(): void {
			if (!this.touchedState.slug) {
				this.state.slug = this.state.title.toLowerCase().trim().replaceAll(" ", "-").replaceAll(":", "")
			}
		}

		touch(field: keyof Event): void {
			this.touchedState[field] = true
		}

		@Watch("state", { immediate: true, deep: true })
		async validate(): Promise<void> {
			const validate = validator(this.validationRules)
			this.errors = await validate(this.state) ?? null
		}

		async saveEvent(): Promise<void> {
			await this.validate()
			if (this.hasErrors) {
				return
			}
			this.loading = true
			try {
				await eventClient.createEvent(this.state)
				await this.getAllEvents()
				await this.$router.push({
					path: "/events"
				})
			} catch (e) {
				// pass
			} finally {
				this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
