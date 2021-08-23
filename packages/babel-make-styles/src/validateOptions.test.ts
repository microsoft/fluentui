import { validateOptions } from './validateOptions';
import type { BabelPluginOptions } from './types';

describe('validateOptions', () => {
  it('passes on valid options', () => {
    const pluginOptionsA: BabelPluginOptions = {
      modules: [{ moduleSource: 'react-make-styles', importName: 'makeStyles' }],
      babelOptions: {
        presets: ['@babel/preset'],
        plugins: ['@babel/plugin'],
      },
    };

    expect(() => validateOptions(pluginOptionsA)).not.toThrow();
  });

  it('throws on wrong options', () => {
    const pluginOptionsA = { modules: {} };
    const pluginOptionsB = { babelOptions: [] };

    // @ts-expect-error Invalid options are passed for testing purposes
    expect(() => validateOptions(pluginOptionsA)).toThrowErrorMatchingInlineSnapshot(
      `"Validation failed for passed config: data/modules must be array"`,
    );
    // @ts-expect-error Invalid options are passed for testing purposes
    expect(() => validateOptions(pluginOptionsB)).toThrowErrorMatchingInlineSnapshot(
      `"Validation failed for passed config: data/babelOptions must be object"`,
    );
  });
});
