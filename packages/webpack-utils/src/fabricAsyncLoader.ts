// This code is heavily inspired by https://github.com/baflo/react-loadable-loader.
import * as webpack from 'webpack';
import * as path from 'path';
import * as loaderUtils from 'loader-utils';

const fabricAsyncLoader: webpack.loader.Loader = (content: string) => {
  return content;
};

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

export = fabricAsyncLoader;
