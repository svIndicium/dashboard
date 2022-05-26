import Vue from "vue"

import { Context } from "@nuxt/types"

import { isDate, isNumber } from "lodash-es"

export enum Filters {
    LOCALE = "locale",
    FULL_DATE = "fullDate",
    CAPITALIZE = "capitalize"
}

type Values = Array<any> | { [key: string]: any }

export default ({ app }: Context): void => {
    Vue.filter(Filters.LOCALE, (key: string, values?: Values) => app.i18n.t(key, values))
    Vue.filter(Filters.FULL_DATE, (value: number | Date) => isDate(value) || isNumber(value) ? app.i18n.d(value, "full") : "")
    Vue.filter(Filters.CAPITALIZE, (value: string) => value.charAt(0).toUpperCase() + value.substring(1))
}
