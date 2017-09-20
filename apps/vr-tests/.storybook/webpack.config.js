/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */

module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    // This replaces Storybook's resolve.extensions so we need to provide all of these
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.ts',
      '.tsx',
      '.md',
    ],
  },
};