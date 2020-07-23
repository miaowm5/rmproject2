module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'linebreak-style': 'off',
    'space-before-blocks': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'arrow-spacing': 'off',
    'no-underscore-dangle': 'off',
    'lines-between-class-members': 'off',
    'keyword-spacing': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    semi: 'off',
  },
};
