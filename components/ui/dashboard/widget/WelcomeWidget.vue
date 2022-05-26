<template>
	<v-col cols="4">
		<v-card class="pa-4">
			{{ `${ baseTranslationKey }.title` | locale }} {{ name }}
		</v-card>
	</v-col>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { Namespaces } from "~/store/configuration"
	import { USER_GETTERS } from "~/store/user"

	const userModule = namespace(Namespaces.USER)

	@Component
	export default class WelcomeWidget extends Vue {
		@userModule.Getter(USER_GETTERS.FULL_NAME) name!: string

		readonly baseTranslationKey = "layout.dashboard.widgets.welcome"
	}
</script>

<style lang="scss" scoped>

</style>
