<template>
	<v-row>
		<IWelcomeWidget />
		<IComingEventsWidget />
	</v-row>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import IWelcomeWidget from "~/components/ui/dashboard/widget/IWelcomeWidget.vue"
	import IComingEventsWidget from "~/components/ui/dashboard/widget/IComingEventsWidget.vue"

	@Component({
		components: {
			IComingEventsWidget,
			IWelcomeWidget
		}
	})
	export default class Index extends Vue {
}
</script>
