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

  /**
   * This removes ProgressPlugin in Storybook's webpack config found here:
   * ~\vr-tests\node_modules\@storybook\react\dist\server\config\webpack.config.js
   * This plugin is what causes the logging spam in Travis.
   * Note this workaround may not be safe if Storybook changes their config in the future.
   * https://github.com/storybooks/storybook/issues/2029
   */
  storybookBaseConfig.plugins.pop();
  console.warn('Warning: Storybook webpack config plugins are being manually changed. If there are any issues with Storybook\'s build, \'~/vr-tests/.storybook/webpack.config.js\' may need to be updated.');

  // Return the altered config
  return storybookBaseConfig;
};