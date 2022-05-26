<template>
	<v-app dark>
		<Header />
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
		<SideBar />
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import Header from "~/components/ui/layout/Header.vue"
	import SideBar from "~/components/ui/layout/SideBar.vue"

@Component({
	components: {
		Header,
		SideBar
	}
})
export default class Default extends Vue {
}
</script>
