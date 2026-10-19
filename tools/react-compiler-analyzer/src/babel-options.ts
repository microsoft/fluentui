import { extname } from 'node:path';

import type { TransformOptions } from '@babel/core';

export function createBabelOptions(filePath: string, parserPlugins: string[] = []): TransformOptions {
  return {
    filename: filePath,
    babelrc: false,
    configFile: false,
    ...(parserPlugins.length
      ? {
          parserOpts: {
            plugins: [...parserPlugins] as NonNullable<NonNullable<TransformOptions['parserOpts']>['plugins']>,
          },
        }
      : {}),
    presets: [
      [
        require.resolve('@babel/preset-typescript'),
        {
          // Enabling JSX for `.ts` would parse an angle-bracket assertion as an unterminated JSX element.
          isTSX: extname(filePath) === '.tsx',
          allExtensions: true,
          allowDeclareFields: true,
        },
      ],
    ],
  };
}
