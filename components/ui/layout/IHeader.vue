<template>
	<div>
		<v-app-bar
				clipped-left
				fixed
				app
		>
			<v-toolbar-title>{{ `${ baseTranslationKey }.title` | locale }}</v-toolbar-title>
			<v-spacer />
		</v-app-bar>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Component from "vue-class-component";

	@Component
	export default class IHeader extends Vue {
		readonly baseTranslationKey = "layout.header"
	}
</script>

<style scoped lang="scss">

</style>
