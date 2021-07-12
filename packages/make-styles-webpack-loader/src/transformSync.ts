import * as Babel from '@babel/core';
import babelPluginMakeStyles from '@fluentui/babel-make-styles';

export type TransformOptions = {
  filename: string;

  inputSourceMap: Babel.TransformOptions['inputSourceMap'];
  enableSourceMaps: boolean;
};

export type TransformResult = {
  code: string;
  sourceMap: NonNullable<Babel.BabelFileResult['map']> | undefined;
};

/**
 * Transforms passed source code with Babel, uses user's config for parsing, but ignores it for transforms.
 */
export function transformSync(sourceCode: string, options: TransformOptions): TransformResult {
  // Parse the code first so Babel will use user's babel config for parsing
  // During transforms we don't want to use user's config
  const ast = Babel.parseSync(sourceCode, {
    caller: { name: 'make-styles' },

    filename: options.filename,
    inputSourceMap: options.inputSourceMap,
    sourceMaps: options.enableSourceMaps,
  })!;

  const babelFileResult = Babel.transformFromAstSync(ast, sourceCode, {
    // Ignore all user's configs and apply only our plugin
    babelrc: false,
    configFile: false,
    plugins: [[babelPluginMakeStyles]],

    filename: options.filename,

    sourceMaps: options.enableSourceMaps,
    sourceFileName: options.filename,
    inputSourceMap: options.inputSourceMap,
  })!;

  return {
    code: babelFileResult.code as string,
    sourceMap: babelFileResult.map === null ? undefined : babelFileResult.map,
  };
}
