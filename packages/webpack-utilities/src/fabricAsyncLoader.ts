import * as path from 'path';
import * as loaderUtils from 'loader-utils';

function getMagicComments(options: loaderUtils.OptionObject): string {
  const magicCommentsOptions: { [key: string]: string } = {
    webpackChunkName: `"${options.chunkName || 'fabric.async'}"`,
    webpackPrefetch: options.prefetch as string,
    webpackPreload: options.preload as string,
  };

  return Object.keys(magicCommentsOptions)
    .map((key: string) => {
      if (magicCommentsOptions[key] !== undefined) {
        return `/* ${key}: ${magicCommentsOptions[key]} */`;
      } else {
        return null;
      }
    })
    .filter((s: string) => s)
    .join(' ');
}

/**
 * Fabric async loader will automatically replace the Fabric components specified in the "include" option of the
 * loader with the below code.
 * The code uses the `react-loadable` control to facilitate auto code-splitting at the Fabric component level.
 *
 * NOTE: This code is heavily inspired by https://github.com/baflo/react-loadable-loader.
 *
 * @param content the source code to be transformed
 */
module.exports = function (content: string): string {
  return content;
};

/**
 * Pitch is first phase of the loading process; it gives access to the module name.
 * This method actually injects the code.
 * @see https://github.com/webpack/docs/wiki/loaders
 *
 * @param remainingRequest the remaining requested module
 * @param previousRequest the remaining requested module
 */
module.exports.pitch = function (remainingRequest: string, precedingRequest: string): string {
  const options = loaderUtils.getOptions(this) || {};
  const moduleRequest = `!!${remainingRequest}`;
  const normalizedRequest = loaderUtils.stringifyRequest(this, moduleRequest);
  const moduleName = path.basename(normalizedRequest).replace(/\..*$/, '');
  const request = loaderUtils.stringifyRequest(this, moduleRequest);

  return [
    "import Loadable from 'react-loadable';",
    `export var ${moduleName} = Loadable({`,
    `  loader: function() { return import(${getMagicComments(
      options,
    )} ${request}).then(function(m) { return m.${moduleName}; }); },`,
    `  loading: function() { return null; }`,
    `});`,
  ].join('\n');
};
