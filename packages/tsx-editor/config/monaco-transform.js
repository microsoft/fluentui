const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  babelrc: false,
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-modules-commonjs']
});
