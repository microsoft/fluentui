const babelLoader = require('babel-loader');

/**
 * Custom loader wraps the original babel-loader and fixes the incorrect `inputSourceMap` that
 * is passed from a loader that uses the `sourceMap` option.
 */
module.exports = function (source: string, inputSourceMap?: object | boolean | string) {
  return babelLoader.call(
    this,
    source,
    typeof inputSourceMap === 'string' ? JSON.parse(inputSourceMap) : inputSourceMap,
  );
};
