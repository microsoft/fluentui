// @ts-check
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: ['../../react-button/src/**/*.stories.tsx', '../stories/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
    '../src/addons/design-tokens/register',
  ],
  webpackFinal: async (config: any) => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
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
              plugins: function () {
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

  // your Storybook configuration
  refs: {
    paul: {
      title: 'Paul Gildea',
      url: 'https://wonderful-cliff-08b0cde1e.azurestaticapps.net',
    },
    miro: {
      title: 'Miroslav Stastny',
      url: 'https://60088dd0e49a64002183357c-ncilogmlgq.chromatic.com',
    },
    justin: {
      title: 'Justin Slone',
      url: 'https://6008f800bdb9db002140ac05-vaxwghzuqf.chromatic.com',
    },
  },
};

function useBabel() {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            ['@babel/preset-env'],
            ['@babel/preset-typescript', { allowNamespaces: true }],
            '@babel/preset-react',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
    ],
  };
}
