import * as path from 'path';

import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import webpack from 'webpack';

import config from '../../config';

const { paths } = config;

type WebpackOptions = {
  packageName: string;
  outputFilePath: string;
  onDependencyPackage: (packageName: string, packageVersion: string) => void;
};

export const prepareWebpackConfig = (options: WebpackOptions) => {
  const { packageName, outputFilePath, onDependencyPackage } = options;

  return {
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: {
      app: paths.packageSrc(packageName, 'index'),
    },
    output: {
      path: path.dirname(outputFilePath),
      filename: path.basename(outputFilePath),
    },
    module: {
      noParse: [/anchor-js/],
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new LicenseWebpackPlugin({
        stats: {
          warnings: true,
          errors: true,
        },
        renderLicenses: modules => {
          modules.forEach(module => {
            if (module.packageJson) {
              const packageName = module.packageJson.name;
              const packageVersion = module.packageJson.version;

              onDependencyPackage(packageName, packageVersion);
            } else {
              console.error('package.json not found');
            }

            return modules[0].packageJson?.name;
          });

          return '';
        },
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        ...config.webpackAliases,
        src: paths.packageSrc('react-northstar'),
      },
    },
  };
};

export const runWebpack = (config: any, done: (err: any, stats: any) => void) => {
  webpack(config).run(done);
};
