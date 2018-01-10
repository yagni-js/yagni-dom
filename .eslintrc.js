
module.exports = {
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    "fp",
    "better",
    "import"
  ],
  extends: [
    "eslint:recommended",
    "plugin:fp/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  rules: {
    // eslint:recommended
    "comma-spacing": ["error", {before: false, after: true}],
    "comma-style": ["error", "last"],
    "eqeqeq": "error",
    "indent": ["error", 2, {SwitchCase: 1}],
    "key-spacing": ["error", {beforeColon: false, afterColon: true}],
    "keyword-spacing": ["error", {before: true, after: true}],
    "no-unused-vars": "off",  // handled by eslint-plugin-fp
    // eslint-plugin-better
    "better/no-ifs": "error",
    "better/no-new": "error",
    "better/no-instanceofs": "error",
    "better/explicit-return": "error",
    // following rules are handled by eslint-plugin-fp
    "better/no-deletes": "off",
    "better/no-exceptions": "off",
    "better/no-classes": "off",
    "better/no-exports": "off",
    "better/no-fors": "off",
    "better/no-function-expressions": "off",
    "better/no-imports": "off",
    "better/no-nulls": "off",
    "better/no-reassigns": "off",
    "better/no-switches": "off",
    "better/no-this": "off",
    "better/no-typeof": "off",
    "better/no-undefined": "off",
    "better/no-variable-declaration": "off",
    "better/no-whiles": "off",
    // eslint-plugin-import
    "import/no-extraneous-dependencies": "error",
    "import/no-absolute-path": "error",
    "import/no-mutable-exports": "error",
    "import/no-commonjs": "error",
    "import/no-amd": "error",
    "import/no-nodejs-modules": "error"
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
};
