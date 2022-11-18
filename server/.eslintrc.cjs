module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'import/order': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ]
  }
}
