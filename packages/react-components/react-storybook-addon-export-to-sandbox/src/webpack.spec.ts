import { PresetConfig } from './public-types';
import { webpack, WebpackFinalOptions } from './webpack';
describe(`webpack`, () => {
  it(`should register webpack preset with defaults`, () => {
    const actual = webpack({ module: { rules: [] } }, {
      presetsList: [
        {
          name: 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js',
          preset: {},
          options: {},
        },
      ],
    } as WebpackFinalOptions);

    expect(actual.module?.rules).toEqual([
      {
        enforce: 'pre',
        test: /\.stories\.(jsx?$|tsx?$)/,
        use: {
          loader: expect.stringContaining('babel-loader'),
          options: {
            parserOpts: { plugins: ['typescript', 'jsx'] },
            plugins: [
              [
                expect.stringContaining('babel-preset-storybook-full-source'),
                { importMappings: undefined, cssModules: false },
              ],
            ],
          },
        },
      },
    ]);
  });

  it(`should register webpack preset with user provided options`, () => {
    const actual = webpack({ module: { rules: [] } }, {
      presetsList: [
        {
          name: 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js',
          preset: {},
          options: {
            importMappings: {
              '@proj/foo': { replace: '@proj/moo' },
            },
            webpackRule: { test: /\.stories\.tsx?/, include: /foo-stories/ },
            babelLoaderOptionsUpdater: value => {
              return Object.assign(value, { presets: ['babel-foo-bar-preset'] });
            },
          } as PresetConfig,
        },
      ],
    } as WebpackFinalOptions);

    expect(actual.module?.rules).toEqual([
      {
        enforce: 'pre',
        test: /\.stories\.tsx?/,
        include: /foo-stories/,
        use: {
          loader: expect.stringContaining('babel-loader'),
          options: {
            parserOpts: { plugins: ['typescript', 'jsx'] },
            plugins: [
              [
                expect.stringContaining('babel-preset-storybook-full-source'),
                {
                  importMappings: { '@proj/foo': { replace: '@proj/moo' } },
                  cssModules: false,
                },
              ],
            ],
            presets: ['babel-foo-bar-preset'],
          },
        },
      },
    ]);
  });

  it.each([
    [
      'windows native path (loadWorkspaceAddon output)',
      String.raw`C:\repo\packages\react-components\react-storybook-addon-export-to-sandbox\temp\preset.ts`,
    ],
    [
      'posix native path (loadWorkspaceAddon output)',
      '/repo/packages/react-components/react-storybook-addon-export-to-sandbox/temp/preset.ts',
    ],
    ['posix node_modules path', 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js'],
  ])(`should read addon options from a %s`, (_label, presetName) => {
    const actual = webpack({ module: { rules: [] } }, {
      presetsList: [{ name: presetName, preset: {}, options: { cssModules: true } as PresetConfig }],
    } as WebpackFinalOptions);

    const rule = actual.module?.rules?.[0] as import('webpack').RuleSetRule;
    const use = rule.use as { options: { plugins: [[string, { cssModules: unknown }]] } };

    // A separator the pattern cannot match makes getAddonOptions fall back to bare defaults and
    // silently drop every user option (`cssModules: false`) — see DECISIONS.md D8.
    expect(use.options.plugins[0][1].cssModules).toBe(true);
  });

  it.each([
    ['boolean true', true as const],
    ['object with tokensFilePath', { tokensFilePath: '/path/to/tokens.css' }],
  ])(`should propagate cssModules config (%s) to babel plugin`, (_label, cssModules) => {
    const actual = webpack({ module: { rules: [] } }, {
      presetsList: [
        {
          name: 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js',
          preset: {},
          options: { cssModules } as PresetConfig,
        },
      ],
    } as WebpackFinalOptions);

    expect(actual.module?.rules).toEqual([
      {
        enforce: 'pre',
        test: /\.stories\.(jsx?$|tsx?$)/,
        use: {
          loader: expect.stringContaining('babel-loader'),
          options: {
            parserOpts: { plugins: ['typescript', 'jsx'] },
            plugins: [
              [
                expect.stringContaining('babel-preset-storybook-full-source'),
                { importMappings: undefined, cssModules },
              ],
            ],
          },
        },
      },
    ]);
  });
});
