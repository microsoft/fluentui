// @ts-check

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackBundler from 'monosize-bundler-webpack';

import baseConfig from '../../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  bundler: webpackBundler(config => {
    const cssFilename = config.output?.filename === '[name]/index.js' ? '[name]/index.css' : 'index.css';

    config.externals = {
      ...(typeof config.externals === 'object' ? config.externals : {}),
      react: 'React',
      'react/jsx-runtime': 'jsxRuntime',
      'react-dom': 'ReactDOM',
      'react/compiler-runtime': 'ReactCompilerRuntime',
    };
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.optimization = config.optimization ?? {};
    config.optimization.minimizer = [...(config.optimization.minimizer ?? ['...']), new CssMinimizerPlugin()];
    config.plugins = config.plugins ?? [];
    config.module.rules.push(
      { test: /\.[cm]?js$/, resolve: { fullySpecified: false } },
      {
        test: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }],
      },
    );
    config.plugins.push(new MiniCssExtractPlugin({ filename: cssFilename }));
    return config;
  }),
  assetTypes: ['js', 'css'],
};

export default monosizeConfig;
