// @ts-check

module.exports = function(env) {
  const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
  const path = require('path');
  const resources = require('@uifabric/build/webpack/webpack-resources');
  const { addMonacoConfig } = require('@uifabric/tsx-editor/scripts/monaco-webpack');
  // @ts-ignore
  const version = require('./package.json').version;
  const isProductionArg = env && env.production;
  const now = Date.now();

  // Production defaults
  let minFileNamePart = '';
  const entryPointName = 'fabric-sitev5';
  let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

  // Dogfood overrides
  if (!isProductionArg) {
    publicPath = '/dist/';
  } else {
    minFileNamePart = '.min';
  }

  return resources.createConfig(
    entryPointName,
    isProductionArg,
    addMonacoConfig({
      entry: {
        [entryPointName]: './lib/root.js'
      },

      output: {
        publicPath: publicPath,
        chunkFilename: `${entryPointName}-${version}-[name]-${now}${minFileNamePart}.js`
      },

      resolve: {
        alias: getResolveAlias()
      }
    }),
    /* only production */ isProductionArg
  );
};
