<template>
	<v-navigation-drawer
		clipped
		fixed
		app
	>
		<v-list>
			<v-list-item
				v-for="(item, i) in items"
				:key="i"
				:to="item.to"
				router
				exact
			>
				<v-list-item-action>
					<v-icon>mdi-{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>{{ `${ baseTranslationKey }.${ item.translationKey }` | locale }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { namespace } from "vuex-class"
	import { Namespaces } from "~/store/configuration"
	import { UI_GETTERS } from "~/store/ui"
	import { SidebarItem } from "~/components/ui/layout/index"

	const uiModule = namespace(Namespaces.UI)

	@Component
	export default class ISideBar extends Vue {
		@uiModule.Getter(UI_GETTERS.MENU_ITEMS) items!: Array<SidebarItem>

		readonly baseTranslationKey = "layout.sidebar"
	}
</script>

<style scoped lang="scss">

</style>
