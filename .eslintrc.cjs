module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'jsx-a11y'],
  rules: {
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      2,
      { vars: 'local', args: 'after-used', argsIgnorePattern: '_' },
    ],
    'no-console': [
      'error',
      {
        allow: ['error', 'info', 'warn'],
      },
    ],
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2, 10, 100, 1000] }],
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
