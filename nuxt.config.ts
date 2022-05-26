import { NuxtConfig } from "@nuxt/types"

const config: Omit<NuxtConfig, "env"> = {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  srcDir: "./",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - test",
    title: "test",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
    script: [
      { src: "/config.js", defer: false }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      "plugins/filters",
      "plugins/api-clients",
      "plugins/event-bus"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/i18n",
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      disable: true
      // dark: false,
      // themes: {
      //   dark: {
      //     primary: colors.blue.darken2,
      //     accent: colors.grey.darken3,
      //     secondary: colors.amber.darken3,
      //     info: colors.teal.lighten1,
      //     warning: colors.amber.base,
      //     error: colors.deepOrange.accent4,
      //     success: colors.green.accent3
      //   }
      // }
    }
  },

  i18n: {
    defaultLocale: "nl-NL",
    langDir: "i18n/",
    lazy: true,
    locales: [
      {
        code: "nl-NL",
        iso: "nl-NL",
        file: "nl-NL.ts"
      }
    ],
    vueI18n: {
      fullbackLocale: "nl-NL",
      silentFallbackWarn: true,
      dateTimeFormats: {
        "nl-NL": {
          short: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          },
          full: {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
        "lodash-es"
    ]
  }
}

export default config
