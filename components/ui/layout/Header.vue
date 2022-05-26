<template>
	<div>
		<v-app-bar
			clipped-left
			fixed
			app
		>
			<v-app-bar-nav-icon
				@click.stop="openSideBar"
			/>
			<v-toolbar-title>{{ `${ baseTranslationKey }.title` | locale }}</v-toolbar-title>
			<v-spacer />
		</v-app-bar>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { Emit } from "vue-property-decorator"

	@Component
	export default class Header extends Vue {
		readonly baseTranslationKey = "layout.header"

		@Emit("openSideBar")
		openSideBar(): void {
		}
	}
</script>

<style scoped lang="scss">

</style>
