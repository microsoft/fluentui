// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = /** @type {import('webpack').Configuration} */ ({
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
                react: {
                  runtime: 'automatic',
                },
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
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: '<div id="root"></div>',
    }),
  ],
});
