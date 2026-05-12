import { PresetConfig } from './public-types';
import { webpack, WebpackFinalOptions } from './webpack';
describe(`webpack`, () => {
  it.each([
    ['POSIX path', 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js'],
    ['Windows path', 'node_modules\\@fluentui\\react-storybook-addon-export-to-sandbox\\lib\\preset.js'],
  ])(`should register webpack preset with defaults from %s`, (_label, presetName) => {
    const actual = webpack({ module: { rules: [] } }, {
      presetsList: [
        {
          name: presetName,
          preset: {},
          options: {},
        },
      ],
    } as WebpackFinalOptions);

    expect(actual.module?.rules).toEqual([
      {
        enforce: 'post',
        test: /\.stories\.(jsx?$|tsx?$)/,
        use: {
          loader: expect.stringContaining('custom-babel-loader'),
          options: {
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
        enforce: 'post',
        test: /\.stories\.tsx?/,
        include: /foo-stories/,
        use: {
          loader: expect.stringContaining('custom-babel-loader'),
          options: {
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
        enforce: 'post',
        test: /\.stories\.(jsx?$|tsx?$)/,
        use: {
          loader: expect.stringContaining('custom-babel-loader'),
          options: {
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
