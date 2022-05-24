<template>
	<div>
		<ICheckBox
			v-model="test"
		>
			<template #label>Hoi</template>
		</ICheckBox>
		{{ test }}
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {Component} from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class test extends Vue {
		test = false
	}
</script>

<style scoped>

</style>
