const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const pages = [
  {
    name: 'v8-simple-stress',
    path: './src/v8/simple-stress/index.tsx',
    template: './src/v8/simple-stress/index.html',
    output: 'v8/simple-stress/index.html',
  },
  {
    name: 'v9-simple-stress',
    path: './src/v9/simple-stress/index.tsx',
    template: './src/v9/simple-stress/index.html',
    output: 'v9/simple-stress/index.html',
  },
  {
    name: 'wc-simple-stress',
    path: './src/wc/simple-stress/index.wc.ts',
    template: './src/wc/simple-stress/index.html',
    output: 'wc/simple-stress/index.html',
  },
];

const config = {
  mode: isProd ? 'production' : 'development',
  entry: pages.reduce((config, page) => {
    config[page.name] = page.path;
    return config;
  }, {}),
  output: {
    filename: '[name].[contenthash].bundle.js',
    sourceMapFilename: '[name].[contenthash].map',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // Apply "exclude" only if your dependencies **do not use** Griffel
        // exclude: /node_modules/,
        exclude: /\.wc\.(ts|tsx)?$/,
        use: {
          loader: GriffelCSSExtractionPlugin.loader,
        },
      },
      // Add "@griffel/webpack-loader" if you use Griffel directly in your project
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
        use: {
          loader: '@griffel/webpack-loader',
          options: {
            babelOptions: {
              plugins: ['@babel/plugin-proposal-class-static-block'],
              presets: ['@babel/preset-typescript'],
            },
          },
        },
      },
      // "css-loader" is required to handle produced CSS assets by Griffel
      // you can use "style-loader" or "MiniCssExtractPlugin.loader" to handle CSS insertion
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
      },

      // Match Web Component files
      // Not sure why babel-loader isn't working but
      // the FAST docs use ts-loader and it "just works"
      // so let's roll with it for now.
      {
        test: /\.wc\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [].concat(
    pages.map(page => {
      return new HtmlWebpackPlugin({
        inject: 'body',
        template: page.template,
        filename: page.output,
        chunks: [page.name],
      });
    }),
    [new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin(), new CleanWebpackPlugin()],
  ),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: 9000,
    open: false,
    hot: true,
    compress: true,
  };
}

module.exports = config;
