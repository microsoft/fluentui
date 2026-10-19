import { transformSync } from '@babel/core';

import { createBabelOptions } from '../babel-options';

describe('createBabelOptions', () => {
  it.each([
    ['module.ts', false],
    ['module.tsx', true],
  ] as const)('configures TypeScript parsing for %s', (filePath, isTSX) => {
    expect(createBabelOptions(filePath)).toEqual({
      filename: filePath,
      babelrc: false,
      configFile: false,
      presets: [
        [require.resolve('@babel/preset-typescript'), { isTSX, allExtensions: true, allowDeclareFields: true }],
      ],
    });
  });

  it('copies extra parser plugins without modifying the caller settings', () => {
    const parserPlugins = ['decorators-legacy'];
    const options = createBabelOptions('module.tsx', parserPlugins);

    expect(options.parserOpts?.plugins).toEqual(parserPlugins);
    expect(options.parserOpts?.plugins).not.toBe(parserPlugins);

    parserPlugins.push('jsx');

    expect(options.parserOpts?.plugins).toEqual(['decorators-legacy']);
  });

  it.each(['module.ts', 'module.tsx'])('erases ambient declarations and class fields in %s', filePath => {
    const source = 'declare const prefix: string; export class Legacy { declare context: unknown; }';
    const result = transformSync(source, createBabelOptions(filePath));

    expect(result?.code).toBe('export class Legacy {}');
  });
});
