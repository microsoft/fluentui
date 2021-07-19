import { EvalCache, Module } from '@linaria/babel-preset';
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
  // ⚠ "this._compilation" limits loaders compatibility, however there seems to be no other way to access Webpack's
  // resolver.
  // There is this.resolve(), but it's asynchronous. Another option is to read the webpack.config.js, but it won't work
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
    // We are evaluating modules in Babel plugin to resolve expressions (function calls, imported constants, etc.) in
    // makeStyles() calls, see evaluatePathsInVM.ts.
    // Webpack's config can define own module resolution, Babel plugin should use Webpack's resolution to properly
    // resolve paths.
    Module._resolveFilename = (id, { filename }) => {
      const resolvedPath = resolveSync(path.dirname(filename), id);

      if (!resolvedPath) {
        throw new Error(`enhanced-resolve: Failed to resolve module "${id}"`);
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
