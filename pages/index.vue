<template>
	<v-row>
		<WelcomeWidget />
		<ComingEventsWidget />
	</v-row>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import WelcomeWidget from "~/components/ui/dashboard/widget/WelcomeWidget.vue"
	import ComingEventsWidget from "~/components/ui/dashboard/widget/ComingEventsWidget.vue"

	@Component({
		components: {
			ComingEventsWidget,
			WelcomeWidget
		}
	})
	export default class Index extends Vue {
	}
</script>
