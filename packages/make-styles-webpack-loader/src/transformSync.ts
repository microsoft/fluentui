import * as Babel from '@babel/core';
import babelPluginMakeStyles, { BabelPluginOptions } from '@fluentui/babel-make-styles';

export type TransformOptions = {
  filename: string;

  inputSourceMap: Babel.TransformOptions['inputSourceMap'];
  enableSourceMaps: boolean;

  pluginOptions: BabelPluginOptions;
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
  const babelAST = Babel.parseSync(sourceCode, {
    caller: { name: 'make-styles' },

    filename: options.filename,
    inputSourceMap: options.inputSourceMap,
    sourceMaps: options.enableSourceMaps,
  });

  if (babelAST === null) {
    throw new Error(`Failed to create AST for "${options.filename}" due unknown Babel error...`);
  }

  const babelFileResult = Babel.transformFromAstSync(babelAST, sourceCode, {
    // Ignore all user's configs and apply only our plugin
    babelrc: false,
    configFile: false,
    plugins: [[babelPluginMakeStyles, options.pluginOptions]],

    filename: options.filename,

    sourceMaps: options.enableSourceMaps,
    sourceFileName: options.filename,
    inputSourceMap: options.inputSourceMap,
  });

  if (babelFileResult === null) {
    throw new Error(`Failed to transform "${options.filename}" due unknown Babel error...`);
  }

  return {
    code: babelFileResult.code as string,
    sourceMap: babelFileResult.map === null ? undefined : babelFileResult.map,
  };
}
