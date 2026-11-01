import { extname } from 'node:path';

import type { TransformOptions } from '@babel/core';

export function createBabelOptions(filePath: string, parserPlugins: string[] = []): TransformOptions {
  return {
    filename: filePath,
    babelrc: false,
    configFile: false,
    parserOpts: {
      plugins: [
        'typescript',
        ...(extname(filePath) === '.tsx' ? ['jsx'] : []),
        'decoratorAutoAccessors',
        ...parserPlugins,
      ] as NonNullable<NonNullable<TransformOptions['parserOpts']>['plugins']>,
    },
  };
}
