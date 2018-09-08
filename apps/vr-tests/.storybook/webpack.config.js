/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */

const path = require('path');

module.exports = (storybookBaseConfig, configType) => {

  const rules = [
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
  ];

  // This replaces Storybook's resolve.extensions so we need to provide all of these
  const extensions = [
    '.js',
    '.json',
    '.jsx',
    '.ts',
    '.tsx',
    '.md',
  ];

  rules.forEach(rule => storybookBaseConfig.module.rules.push(rule));
  extensions.forEach(ext => storybookBaseConfig.resolve.extensions.push(ext));

  // Remove this plugin because it spams Travis log
  storybookBaseConfig.plugins = storybookBaseConfig.plugins.filter(plugin => plugin.constructor.name !== 'ProgressPlugin');

  // Return the altered config
  return storybookBaseConfig;
};