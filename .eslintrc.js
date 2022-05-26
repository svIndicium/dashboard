module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  rules: {
    "vue/html-indent": ["warn", "tab"],
    "object-curly-spacing": "error",
    curly: "error",
    quotes: ["warn", "double"],
    indent: "off",
    "space-before-function-paren": "off",
    "no-tabs": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-useless-constructor": "off",
    "template-curly-spacing": "off"
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ]
}
