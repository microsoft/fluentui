const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Automatically configures Webpack to find pages so
 * developers can just add new pages without touching
 * the Webpack config.
 */

/**
 * A page configuration object used to generate Webpack configuration.
 * @typedef {Object} PageConfig
 * @property {string} name - Name of the page.
 * @property {string} path - Path the the index file for the page. This is a tsx (React) or wc.ts (Web Component) file.
 * @property {string} template - HTML template for the page.
 * @property {string} output - Path to the output file
 */

/**
 * Webpack configuration object.
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

/**
 * Webpack `entry` configuration object.
 * @typedef {import('webpack').Entry} WebpackEntry
 */

/**
 * HtmlWebpackPlugin object.
 * @typedef {import('html-webpack-plugin')} HtmlWebpackPlugin
 */

/**
 * Find all the source pages and map them to
 * config objects used to generate the Webpack config.
 *
 * @returns {PageConfig[]} List of page configuration objects.
 */
const getPages = () => {
  const extPattern = /\.(tsx|wc.ts)/;
  const pagePattern = './src/pages/**/*/index.?(tsx|wc.ts)';

  const files = glob.sync(pagePattern);

  const pages = files.map(file => {
    const template = file.replace(extPattern, '.html');
    const prefix = './src/pages/';

    const config = {
      name: file.replace(prefix, '').replace(/\//g, '-').replace(extPattern, ''),
      path: file,
      template,
      output: template.replace(prefix, ''),
    };

    return config;
  });

  return pages;
};

/**
 * Take data from getPages() and generate Webpack
 * config's `entry`.
 *
 * @param {PageConfig[]} pages - List of page configuration objects.
 * @returns {WebpackEntry} `entry` object for Webpack configuration.
 */
const getEntry = pages => {
  return pages.reduce((config, page) => {
    config[page.name] = page.path;
    return config;
  }, {});
};

/**
 * Take data from getPages() and generate
 * HTML plugins for the pages.
 *
 * @param {PageConfig[]} pages - List of page configuration objects.
 * @returns {HtmlWebpackPlugin[]} List of HtmlWebpackPlugins for all pages.
 */
const getHtmlPlugin = pages => {
  return pages.map(page => {
    return new HtmlWebpackPlugin({
      inject: 'body',
      template: page.template,
      filename: page.output,
      chunks: [page.name],
    });
  });
};

/**
 * Take the Webpack config object and set properties
 * to automatically load pages.
 *
 * NOTE: this function mutates the `config` object passed in to it.
 *
 * @param {WebpackConfig} config - Webpack configuration object to modify.
 * @returns {WebpackConfig} Modified Webpack configuration object.
 */
const configurePages = config => {
  const pages = getPages();

  config.entry = getEntry(pages);
  if (config.plugins) {
    config.plugins = [...config.plugins, ...getHtmlPlugin(pages)];
  } else {
    config.plugins = getHtmlPlugin(pages);
  }

  return config;
};

module.exports = {
  configurePages,
};
