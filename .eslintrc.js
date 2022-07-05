module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json']
  },
  rules: {
    'no-cond-assign': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'object-curly-newline': 'off',
    'prettier/prettier': 'error',
    'prefer-template': 'error',
    'consistent-return': 'error',
    'no-param-reassign': 'error',
    'no-eval': 'error',
    'no-undef': 'error',
    'no-extra-boolean-cast': 'error',
    'no-unused-vars': 'error',
    'require-await': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/ban-types': 'error'
  }
};
