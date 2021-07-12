import { EvalCache, Module } from '@linaria/babel';
import * as enhancedResolve from 'enhanced-resolve';
import * as path from 'path';
import * as webpack from 'webpack';

import { transformSync, TransformResult, TransformOptions } from './transformSync';

type WebpackLoaderParams = Parameters<webpack.LoaderDefinitionFunction<never>>;

/**
 * Webpack can also pass sourcemaps as a string, Babel accepts only objects.
 * See https://github.com/babel/babel-loader/pull/889.
 */
function parseSourceMap(inputSourceMap: WebpackLoaderParams[1]): TransformOptions['inputSourceMap'] {
  try {
    if (typeof inputSourceMap === 'string') {
      return JSON.parse(inputSourceMap) as TransformOptions['inputSourceMap'];
    }

    return inputSourceMap as TransformOptions['inputSourceMap'];
  } catch (err) {
    return undefined;
  }
}

export function webpackLoader(
  this: webpack.LoaderContext<never>,
  sourceCode: WebpackLoaderParams[0],
  inputSourceMap: WebpackLoaderParams[1],
) {
  EvalCache.clearForFile(this.resourcePath);

  const resolveOptionsDefaults: webpack.ResolveOptions = {
    conditionNames: ['require'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  };
  // ⚠ "this._compilation" is a deprecated API, however there seems to be no other way to access Webpack's resolver
  // There is this.resolve, but it's asynchronous. Another option is to read the webpack.config.js, but it won't work
  // for programmatic usage. This API is used by many loaders/plugins, so hope we're safe for a while
  const resolveOptionsFromWebpackConfig: webpack.ResolveOptions = this._compilation?.options.resolve || {};

  const resolveSync = enhancedResolve.create.sync({
    ...resolveOptionsDefaults,
    alias: resolveOptionsFromWebpackConfig.alias,
    modules: resolveOptionsFromWebpackConfig.modules,
  });

  const originalResolveFilename = Module._resolveFilename;

  let result: TransformResult | null = null;
  let error: Error | null = null;

  try {
    // Use Webpack's resolution when evaluating modules
    Module._resolveFilename = (id, { filename }) => {
      const resolvedPath = resolveSync(path.dirname(filename), id);

      if (!resolvedPath) {
        // enhanced-resolve v4 throws a error when dependency is missed
        throw new Error('No result');
      }

      this.addDependency(resolvedPath);

      return resolvedPath;
    };

    result = transformSync(sourceCode, {
      filename: path.relative(process.cwd(), this.resourcePath),

      enableSourceMaps: this.sourceMap || false,
      inputSourceMap: parseSourceMap(inputSourceMap),

      // TODO: pass plugin options
    });
  } catch (err) {
    error = err;
  } finally {
    // Restore original behaviour
    Module._resolveFilename = originalResolveFilename;
  }

  if (result) {
    this.callback(null, result.code, result.sourceMap);
    return;
  }

  this.callback(error);
}
