// This code is heavily inspired by https://github.com/baflo/react-loadable-loader.
import * as webpack from 'webpack';
import * as path from 'path';
import * as loaderUtils from 'loader-utils';

/**
 * Fabric async loader will automatically replace the Fabric components specified in the "include" option of the loader with below code
 * The code below uses the `react-loadable` control to facilitate auto code-splitting at the Fabric component level
 *
 * @param content the content - passed through during the
 */
const fabricAsyncLoader: webpack.loader.Loader = (content: string) => {
  return content;
};

/**
 * Pitch is first phase of the loading process, it gives access to the module name. This method actually injects the code.
 * @see https://github.com/webpack/docs/wiki/loaders
 *
 * @param remainingRequest the remaining requested module
 * @param previousRequest the remaining requested module
 */
fabricAsyncLoader.pitch = (remainingRequest: string, precedingRequest: string) => {
  const moduleRequest = `!!${remainingRequest}`;
  const normalizedRequest = loaderUtils.stringifyRequest(this, moduleRequest);
  const moduleName = path.basename(normalizedRequest).replace(/\..*$/, '');
  return [
    "import Loadable from 'react-loadable';",
    `export const ${moduleName} = Loadable({`,
    `  loader: async() => (await import(${loaderUtils.stringifyRequest(this, moduleRequest)})).${moduleName},`,
    `  loading: () => null`,
    `});`
  ].join('');
};

// Exports with the old module export standard (pre-ESM) to make it compatible with Webpack
export = fabricAsyncLoader;
