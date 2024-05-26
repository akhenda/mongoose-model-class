module.exports = {
  extends: ['plugin:@hendacorp/nodest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-process-env': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@shopify/strict-component-boundaries': 'off',
    '@typescript-eslint/no-this-alias': ['error', { allowedNames: ['self'] }],
    'consistent-this': ['error', 'self'],
    '@typescript-eslint/member-ordering': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'n/no-unpublished-import': 'off',
  },
};
