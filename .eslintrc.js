module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['heimdall/node'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    node: {
      paths: ['src'],
      extensions: ['.js', '.jsx', 'ts', 'tsx', 'json'],
    },
  },
  rules: {
    'n/no-unsupported-features/es-syntax': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'n/no-unpublished-import': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-classes-per-file': 'off',
    'sort-class-members/sort-class-members': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'func-names': 'off',
    'no-console': ['warn', { allow: ['clear', 'info', 'error', 'dir', 'trace'] }],
    'no-param-reassign': 'off',
  },
};
