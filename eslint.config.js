import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'build', 'node_modules', '*.env', '*.env.*']),
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      // === VARIABLE DECLARATION ===
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-new-object': 'error',
      'no-new-func': 'error',
      // === VARIABLE ASSIGNMENT ===
      'no-self-assign': 'error',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true },
      ],
      'init-declarations': ['warn', 'always'],
      // === GLOBAL VARIABLES ===
      'no-implicit-globals': 'error',
      'no-restricted-globals': ['warn', 'eval', 'event'],
      // === TEMPLATE LITERALS ===
      'prefer-template': 'warn',
      // === FUNCTION STYLE ===
      'prefer-arrow-callback': 'warn',
      // === PROMISE RULES ===
      'no-async-promise-executor': 'error',
      // === DESTRUCTURING ===
      'prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: false,
          },
        },
      ],
      // === CONTROL FLOW ===
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      // === TYPESCRIPT TYPE SAFETY ===
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // === NAMING CONVENTION ===
      '@typescript-eslint/naming-convention': [
        'warn',
        // variable rules
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          modifiers: ['unused'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        // function rules
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          modifiers: ['unused'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // type rules
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        },
      ],
      // === IMPORT PATHS ===
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],
      // === IMPORT ORDER ===
      'import/order': 'off',
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
    },
  },
  eslintConfigPrettier,
]);
