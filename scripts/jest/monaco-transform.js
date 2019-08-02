const babelJest = require('babel-jest');

// Minimal set of plugins needed to get Monaco's ES modules converted to Jest-friendly commonjs syntax.
// Having to pull in babel-jest isn't ideal, but it's much easier and probably a bit faster at runtime
// than configuring TS to do the transform. (We'd want to give ts-jest a separate tsconfig for TS files
// and JS files, which may not be possible. And doing the transform in a separate build step is awkward.)
module.exports = babelJest.createTransformer({
  babelrc: false,
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-modules-commonjs']
});
