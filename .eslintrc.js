module.exports = {
  env: {
    node: true,
  },
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },

};
