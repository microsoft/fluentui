const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Automatically configures Webpack to find pages so
 * developers can just add new pages without touching
 * the Webpack config.
 */

/**
 * Find all the source pages and map them to
 * config objects used to generate the Webpack config.
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

  console.log(pages);

  return pages;
};

getPages();

/**
 * Take data from getPages() and generate Webpack
 * config's `entry`.
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
 * Returns the modified config object.
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
