import * as path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { configurePages } from './pageConfig.js';
import { configureGriffel } from './griffelConfig.js';
import * as WebpackDevServer from 'webpack-dev-server';
import { GriffelMode } from '../scripts/utils/types';

const enabledReactProfiling = true;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type WebpackArgs = {
  mode: 'production' | 'development' | 'none';
  griffelMode: GriffelMode;
};

type WebpackConfigurationCreator = (
  env: string | undefined,
  argv: WebpackArgs,
) => WebpackDevServer.WebpackConfiguration;

const createConfig: WebpackConfigurationCreator = (_env, argv) => {
  const isProd = argv.mode === 'production';

  let config: WebpackDevServer.WebpackConfiguration = {
    mode: argv.mode,
    output: {
      filename: '[name].[contenthash].bundle.js',
      sourceMapFilename: '[name].[contenthash].map',
      path: path.resolve(path.dirname(__dirname), !isProd ? 'dev-build' : 'dist'),
    },
    devtool: 'source-map',
    resolve: {
      alias: {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      },
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                target: 'es2019',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  decoratorMetadata: true,
                  legacyDecorator: true,
                },
                keepClassNames: true,
                externalHelpers: true,
                loose: true,
              },
            },
          },
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],

    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  if (enabledReactProfiling) {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    };
  }

  if (!isProd) {
    config.devServer = {
      port: 9000,
      open: false,
      hot: true,
      compress: true,
    };
  }

  config = configureGriffel(config, argv.griffelMode);
  config = configurePages(config);

  return config;
};

export default createConfig;
