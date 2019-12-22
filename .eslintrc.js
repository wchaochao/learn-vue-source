module.exports = {
  extends: 'eslint:recommended',
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never']
  }
}
