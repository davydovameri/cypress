import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/**.mjs', '**/**.js']},
  {ignores: ['html*']},
  {languageOptions: 
    { 
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      'cypress': pluginCypress
    },
  },
  {
    rules: {
      "no-unused-vars": 0,
      "@stylistic/js/indent": 0,
      "@stylistic/js/space-in-parens": ["error", "never"],
      "@stylistic/js/arrow-spacing": [2, { "before": true, "after": true }],
      'cypress/unsafe-to-chain-command': 'warn'
    }
  }
];