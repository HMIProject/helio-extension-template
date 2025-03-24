import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.{ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    settings: {
      react: {
        version: '19.0',
      },
    },
    rules: {
      ...pluginHooks.configs.recommended.rules,

      // This produces false positives with internal HELIO types and is
      // redundant with TS checks.
      'react/prop-types': 'off',
      // This produces false positives
      'react/react-in-jsx-scope': 'off',
      // While we _do_ prefer `const` in most cases, this leads to some unwanted
      // eslint errors when e.g. using `let` to denote that we will push items
      // to an array.
      'prefer-const': 'off',

      // Disallow unused vars unless explicitly prefixed with an underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },

    plugins: {
      'react-hooks': pluginHooks,
    },
  },
];
