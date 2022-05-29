<template>
	<v-container>
		<v-card>
			<v-card-title>{{ `${ baseTranslationKey }.title` | locale }}</v-card-title>
			<v-card-text>{{ `${ baseTranslationKey }.subtitle` | locale }}</v-card-text>
			<v-card-text>
				<i-text-input
					v-model="credentials.username"
					:disabled="loading"
					:errors="errors"
					:show-errors="touchedState.username"
					field-name="username"
					@input="touch('username')"
				>
					{{ "general.username" | locale }}
				</i-text-input>
				<i-password-input
					v-model="credentials.password"
					:disabled="loading"
					:errors="errors"
					:show-errors="touchedState.password"
					field-name="password"
					@input="touch('password')"
				>
					{{ "general.password" | locale }}
				</i-password-input>
				<v-expand-transition>
					<i-alert v-show="loginFailed" :type="AlertType.ERROR">
						{{ `${ baseTranslationKey }.alerts.loginFailed` | locale }}
					</i-alert>
				</v-expand-transition>
			</v-card-text>
			<v-card-actions>
				<i-button
					primary
					:loading="loading"
					:disabled="hasErrors"
					@click="login"
				>
					{{ `${ baseTranslationKey }.buttons.login` | locale }}
				</i-button>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { Watch } from "vue-property-decorator"

	import validator from "@svindicium/lib/validation/validator"
	import { ObjectRules, ObjectErrors } from "@svindicium/lib/validation"
	import { TouchedState } from "@svindicium/lib/types/forms"

	import { LoginCredentials } from "@svindicium/components/api/models/authentication"

	import ITextInput from "@svindicium/components/ui/input/ITextInput.vue"
	import IPasswordInput from "@svindicium/components/ui/input/IPasswordInput.vue"
	import IButton from "@svindicium/components/ui/IButton.vue"
	import IAlert from "@svindicium/components/ui/IAlert.vue"
	import { AlertType } from "@svindicium/components/ui"

	import { isNull } from "lodash-es"

	import { Namespaces } from "~/store/configuration"
	import { AUTHENTICATION_ACTIONS } from "~/store/authentication"
	import type { StoreAction } from "~/store"

	const authenticationModule = namespace(Namespaces.AUTHENTICATION)

	@Component({
		components: {
			ITextInput,
			IPasswordInput,
			IButton,
			IAlert
		}
	})
	export default class Login extends Vue {
		@authenticationModule.Action(AUTHENTICATION_ACTIONS.LOGIN) authenticate!: StoreAction<LoginCredentials>

		readonly baseTranslationKey = "pages.login"
		readonly AlertType = AlertType

		loading = false
		loginFailed = false

		credentials: LoginCredentials = {
			username: "",
			password: ""
		}

		touchedState: TouchedState<LoginCredentials> = {
			username: false,
			password: false
		}

		errors: ObjectErrors<LoginCredentials> | null = null

		get validationRules(): ObjectRules<LoginCredentials> {
			return {
				username: {
					required: true
				},
				password: {
					required: true
				}
			}
		}

		get hasErrors(): boolean {
			return !isNull(this.errors)
		}

		async login(): Promise<void> {
			this.loginFailed = false
			await this.validate()
			if (this.hasErrors) {
				return
			}
			this.loading = true
			try {
				await this.authenticate(this.credentials)
				await this.$router.push({
					path: "/"
				})
			} catch (e) {
				this.loginFailed = true
			} finally {
				this.loading = false
			}
		}

		touch(field: keyof LoginCredentials): void {
			this.touchedState[field] = true
		}

		@Watch("credentials", { immediate: true, deep: true })
		async validate(): Promise<void> {
			const validate = validator(this.validationRules)
			this.errors = await validate(this.credentials) ?? null
		}
	}
</script>

<style lang="scss" scoped>

</style>
