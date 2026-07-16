/* eslint-disable jsdoc/check-tag-names */
/** @jest-environment node */

import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

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

  it(`should compile typed stories after a default swc-loader with sourcemaps`, () => {
    const result = spawnSync(process.execPath, [path.join(__dirname, '../config/tests/webpack-integration.cjs')], {
      encoding: 'utf8',
    });

    if (result.status !== 0) {
      throw new Error([result.stdout, result.stderr].filter(Boolean).join('\n'));
    }
  });
});
