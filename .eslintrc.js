module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  rules: {
    "object-curly-spacing": "error",
    curly: "error",
    quotes: ["warn", "double"],
    indent: "off"
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ]
}
