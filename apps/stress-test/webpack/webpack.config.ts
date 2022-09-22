import * as path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { configurePages } from './pageConfig.js';
import { configureGriffel } from './griffelConfig.js';
import * as WebpackDevServer from 'webpack-dev-server';
import { GriffelMode } from '../scripts/utils/types';

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
      path: path.resolve(path.dirname(__dirname), 'dist'),
    },
    devtool: 'source-map',
    resolve: {
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
          oneOf: [
            {
              // Match Web Component files
              // Not sure why babel-loader isn't working but
              // the FAST docs use ts-loader and it "just works"
              // so let's roll with it for now.
              include: /\.wc\.(ts|tsx)?$/,
              use: 'ts-loader',
            },
            {
              use: 'swc-loader',
            },
          ],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };

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
