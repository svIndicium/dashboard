module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ],
  plugins: [
    "sort-class-members",
    "ordered-imports"
  ],
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
    "template-curly-spacing": "off",
    "import/order": "off",
    "ordered-imports/ordered-imports": ["warn", {
      "declaration-ordering": ["type", {
        ordering: ["side-effect", "namespace", "default", "destructured"],
        secondaryOrdering: ["any"]
      }],
      "specifier-ordering": "any",
      "group-ordering": [
        { name: "Vue", match: "^vue", order: 10 },
        { name: "Vue", match: "^@vue", order: 11 },
        { name: "Nuxt", match: "^@nuxt", order: 12 },
        { name: "Lib", match: "^@svindicium/lib", order: 20 },
        { name: "Components: Store", match: "^@svindicium/components/store", order: 30 },
        { name: "Components: Models", match: "^@svindicium/components/api/models", order: 40 },
        { name: "Components: API", match: "^@svindicium/components/api", order: 50 },
        { name: "Components: UI Components", match: "^@svindicium/components/ui", order: 60 },
        { name: "Components: Utils", match: "^@svindicium/components/utils", order: 70 },
        { name: "Store", match: "^store", order: 80 },
        { name: "API", match: "^api", order: 90 },
        { name: "Components", match: "^components", order: 100 },
        { name: "Utils", match: "^utils", order: 110 },
        { name: "Lodash", match: "^lodash-es", order: 120 },
        { name: "Other", match: "^.*", order: 130 }
      ]
    }]
  }
}
