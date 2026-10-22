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
      parserOpts: { plugins: ['typescript', ...(isTSX ? ['jsx'] : []), 'decoratorAutoAccessors'] },
    });
  });

  it('copies extra parser plugins without modifying the caller settings', () => {
    const parserPlugins = ['decorators-legacy'];
    const options = createBabelOptions('module.tsx', parserPlugins);

    expect(options.parserOpts?.plugins).toEqual(['typescript', 'jsx', 'decoratorAutoAccessors', 'decorators-legacy']);
    expect(options.parserOpts?.plugins).not.toBe(parserPlugins);

    parserPlugins.push('jsx');

    expect(options.parserOpts?.plugins).toEqual(['typescript', 'jsx', 'decoratorAutoAccessors', 'decorators-legacy']);
  });

  it.each(['module.ts', 'module.tsx'])('preserves TypeScript without lowering in %s', filePath => {
    const source = 'declare const prefix: string; export class Legacy { declare context: unknown; }';
    const result = transformSync(source, createBabelOptions(filePath));

    expect(result?.code).toContain('declare const prefix: string;');
    expect(result?.code).toContain('declare context: unknown;');
  });
});
