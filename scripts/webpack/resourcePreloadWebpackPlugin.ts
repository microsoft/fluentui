import assert from 'assert';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Compiler, compilation } from 'webpack';

const preloadDirective: Record<string, string> = {
  '.jpeg': 'image',
  '.jpg': 'image',
  '.gif': 'image',
  '.png': 'image',
  '.svg': 'image',
};

type ResourcePreloadWebpackPluginOptions = {
  cwd: string;
  glob: string;
};

function createHTMLElementString({ elementName, attributes = {}, closingTagRequired = false }) {
  assert(elementName, 'Please provide an element name.');
  assert(!/\W/.test(elementName), 'The element name contains invalid characters.');

  const attributeStrings = [];
  for (const [attributeName, attributeValue] of Object.entries(attributes).sort()) {
    if (attributeValue === '') {
      attributeStrings.push(attributeName);
    } else {
      attributeStrings.push(`${attributeName}=${JSON.stringify(attributeValue)}`);
    }
  }

  let elementString = `<${elementName}`;

  if (attributeStrings.length > 0) {
    elementString += ' ' + attributeStrings.join(' ');
  }

  elementString += '>';

  if (closingTagRequired) {
    elementString += `</${elementName}>`;
  }

  return elementString;
}

function insertLinksIntoHead({ html, links = [] }) {
  if (links.length === 0) {
    return html;
  }

  if (html.includes('</head>')) {
    // If a valid closing </head> is found, insert the new <link>s right before it.
    return html.replace('</head>', links.join('') + '</head>');
  }

  if (html.includes('<body>')) {
    // If there's a <body> but no <head>, create a <head> containing the <head>.
    return html.replace('<body>', `<head>${links.join('')}\n</head><body>`);
  }

  throw new Error(`The HTML provided did not contain a </head> or a <body>:\n\n${html}`);
}

export class ResourcePreloadWebpackPlugin {
  options: ResourcePreloadWebpackPluginOptions;

  constructor(options: ResourcePreloadWebpackPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    if (compiler.hooks) {
      // Webpack 4+ Plugin System
      // Hook into the html-webpack-plugin processing

      compiler.hooks.compilation.tap(this.constructor.name, compilation => {
        const [htmlPlugin] = compiler.options.plugins.filter(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
        assert(HtmlWebpackPlugin, 'Unable to find an instance of HtmlWebpackPlugin in the current compilation.');

        const hook = (htmlPlugin.constructor as typeof HtmlWebpackPlugin).getHooks(compilation as any).beforeEmit;

        hook.tapAsync(this.constructor.name, (htmlPluginData, callback) => {
          try {
            callback(null, this.addLinks(compilation, htmlPluginData));
          } catch (error) {
            callback(error);
          }
        });
      });
    } else {
      throw new Error('Only Webpack 4 hooks are supported');
    }
  }

  addLinks(
    compilation: compilation.Compilation,
    htmlPluginData: {
      html: string;
      outputName: string;
      plugin: HtmlWebpackPlugin;
    },
  ) {
    const allFiles = glob.sync(this.options.glob, {
      cwd: this.options.cwd,
    });
    const filteredFiles = allFiles.filter(file => {
      return !!preloadDirective[path.extname(file)];
    });
    const sortedFilteredFiles = filteredFiles.sort();

    const links = [];
    const publicPath = compilation.outputOptions.publicPath || '';

    for (const file of sortedFilteredFiles) {
      const href = `${publicPath}${file}`;
      const attributes = {
        as: 'image',
        href,
        rel: 'preload',
      };

      const linkElementString = createHTMLElementString({
        attributes,
        elementName: 'link',
      });
      links.push(linkElementString);
    }

    htmlPluginData.html = insertLinksIntoHead({
      links,
      html: htmlPluginData.html,
    });

    return htmlPluginData;
  }
}
