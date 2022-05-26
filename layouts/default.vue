<template>
	<v-app dark>
		<IHeader />
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
		<ISideBar />
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import IHeader from "~/components/ui/layout/IHeader.vue"
	import ISideBar from "~/components/ui/layout/ISideBar.vue"

@Component({
	components: {
		IHeader,
		ISideBar
	}
})
export default class Default extends Vue {
}
</script>
