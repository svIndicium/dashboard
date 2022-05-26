import { Context } from "@nuxt/types"
import Vue from "vue"

export default (_: Context): void => {
    Vue.prototype.$eventBus = new Vue()
}
