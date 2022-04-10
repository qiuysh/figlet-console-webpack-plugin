module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  rules: {
    "prefer-const": "warn",
    "no-var": "warn",
    "one-var": [
      "warn",
      { var: "always", let: "never", const: "never" },
    ],
    "no-sequences": "warn",
    "no-cond-assign": "warn",
    "no-unused-vars": "warn",
    "no-unused-expressions": [
      "warn",
      { allowTernary: true },
    ],
    "no-useless-escape": "warn",
    "no-import-assign": "warn",
    "no-nested-ternary": "warn",
    "no-bitwise": "warn",
    "no-void": "warn",
    "no-restricted-globals": "warn",
    yoda: "off",
    "prefer-destructuring": "warn",
    "class-methods-use-this": "warn",
  },
};
