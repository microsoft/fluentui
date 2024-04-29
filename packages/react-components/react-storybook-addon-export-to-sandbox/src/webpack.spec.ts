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
        enforce: 'post',
        test: /\.stories\.(jsx?$|tsx?$)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [[expect.stringContaining('babel-preset-storybook-full-source'), undefined]],
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
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                expect.stringContaining('babel-preset-storybook-full-source'),
                { '@proj/foo': { replace: '@proj/moo' } },
              ],
            ],
            presets: ['babel-foo-bar-preset'],
          },
        },
      },
    ]);
  });
});
