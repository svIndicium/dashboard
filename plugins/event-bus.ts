import {Context} from "@nuxt/types";
import Vue from "vue";

export default ({ app }: Context): void => {
    Vue.prototype.$eventBus = new Vue()
}
