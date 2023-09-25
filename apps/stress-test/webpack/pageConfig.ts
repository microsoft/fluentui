import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

/**
 * Automatically configures Webpack to find pages so
 * developers can just add new pages without touching
 * the Webpack config.
 */

export type PageConfig = {
  name: string;
  path: string;
  template: string;
  output: string;
};

/**
 * Find all the source pages and map them to
 * config objects used to generate the Webpack config.
 */
const getPages: () => PageConfig[] = () => {
  const extPattern = /\.(tsx?)/;
  const pagePattern = './src/pages/**/*/index.?(tsx|ts)';

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
 */
const getEntry: (pages: PageConfig[]) => webpack.Entry = pages => {
  const init = {} as Record<string, string>;
  return pages.reduce((config, page) => {
    config[page.name] = page.path;
    return config;
  }, init);
};

/**
 * Take data from getPages() and generate
 * HTML plugins for the pages.
 */
const getHtmlPlugin: (pages: PageConfig[]) => HtmlWebpackPlugin[] = pages => {
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
 */
const configurePages: (config: webpack.Configuration) => webpack.Configuration = config => {
  const pages = getPages();

  config.entry = getEntry(pages);
  if (config.plugins) {
    config.plugins = [...config.plugins, ...getHtmlPlugin(pages)];
  } else {
    config.plugins = getHtmlPlugin(pages);
  }

  return config;
};

export { configurePages };
