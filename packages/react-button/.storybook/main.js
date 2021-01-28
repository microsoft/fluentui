// // @ts-check
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
// const custom = require('@fluentui/scripts/storybook/webpack.config');

// module.exports = {
//   // addons: ['@storybook/addon-a11y/register', 'storybook-addon-performance/register', '@storybook/addon-knobs/register'],
//   stories: ['../src/**/*.stories.@(jsx|js)'],
//   babel: async options => ({
//     ...options,
//     presets: [['@babel/preset-env'], ['@babel/preset-typescript', { allowNamespaces: true }], '@babel/preset-react'],
//     // any extra options you want to set
//   }),
//   webpackFinal: async (/** @type {import('webpack').Configuration} */ config) => {

//     // {
//     //   test: /\.tsx?$/,
//     //   use: [
//     //     {
//     //       loader: require.resolve('babel-loader'),
//     //       options: {
//     //         presets: [
//     //           ['@babel/preset-env'],
//     //           ['@babel/preset-typescript', { allowNamespaces: true }],
//     //           '@babel/preset-react',
//     //         ],
//     //         plugins: [
//     //           ['@babel/plugin-proposal-decorators', { legacy: true }],
//     //           '@babel/plugin-proposal-object-rest-spread',
//     //           '@babel/plugin-proposal-class-properties',
//     //           '@babel/plugin-syntax-dynamic-import',
//     //         ],
//     //       },
//     //     },
//     //   ],
//     // },
//     //   {
//     //     test: /\.scss$/,
//     //     enforce: 'pre',
//     //     exclude: [/node_modules/],
//     //     use: [
//     //       {
//     //         loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
//     //       },
//     //       {
//     //         loader: 'css-loader', // translates CSS into CommonJS
//     //         options: {
//     //           modules: {
//     //             localIdentName: '[name]_[local]_[hash:base64:5]',
//     //           },
//     //           importLoaders: 2,
//     //         },
//     //       },
//     //       {
//     //         loader: 'postcss-loader',
//     //         options: {
//     //           plugins: function() {
//     //             return [require('autoprefixer')];
//     //           },
//     //         },
//     //       },
//     //       {
//     //         loader: 'sass-loader',
//     //       },
//     //     ],
//     //   },

//     return config;
//   },
// };

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    'storybook-addon-performance/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: async (config, { configType }) => {
    const tsPaths = new TsconfigPathsPlugin({
      // configFile: path.resolve(process.cwd(), '../..', './tsconfig.base.json'),
      configFile: './tsconfig.base.json',
    });

    const customRules = [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true },
          },
        ],
      },
      // SCSS
      {
        test: /\.scss$/,
        enforce: 'pre',
        exclude: [/node_modules/],
        use: [
          {
            loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.resolve.extensions.push('.ts', '.tsx');

    if (Array.isArray(config.resolve.plugins)) {
      config.resolve.plugins.push(tsPaths);
    }
    config.resolve.plugins = [tsPaths];

    config.module.rules.push(...customRules);

    return config;
  },
};
