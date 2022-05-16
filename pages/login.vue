<template>
	<div></div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Component from "vue-class-component";
	import {namespace} from "vuex-class";
	import {Namespaces} from "~/store/configuration";
	import {AUTHENTICATION_ACTIONS} from "~/store/authentication";
	import {LoginCredentials} from "~/api/models/authentication";
	import {StoreAction} from "~/store";

	const authenticationModule = namespace(Namespaces.AUTHENTICATION)

	@Component
	export default class Login extends Vue {
		@authenticationModule.Action(AUTHENTICATION_ACTIONS.LOGIN) login!: StoreAction<LoginCredentials>

		async mounted(): Promise<void> {
			await this.login({ username: "Test", password: "hoi" })
		}
	}
</script>

<style lang="scss" scoped>

</style>
