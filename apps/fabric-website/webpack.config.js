module.exports = function(env) {
  const path = require('path');
  const resources = require('../../scripts/webpack/webpack-resources');
  const version = require('./package.json').version;
  const isDogfoodArg = env && !env.production;
  const isProductionArg = env && env.production;
  const now = Date.now();

  // Production defaults
  let minFileNamePart = '';
  let entryPointName = 'fabric-sitev5';
  let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

  // Dogfood overrides
  if (!isProductionArg) {
    publicPath = '/dist/';
  } else {
    minFileNamePart = '.min';
  }

  return (
    resources.createConfig(entryPointName, isProductionArg, {
      entry: {
        [entryPointName]: './lib/root.js',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker.js'
      },

      output: {
        publicPath: publicPath,
        globalObject: 'self', // required for monaco--see https://github.com/webpack/webpack/issues/6642
        chunkFilename: `${entryPointName}-${version}-[name]-${now}${minFileNamePart}.js`
      },

      resolve: {
        alias: {
          '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
          '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
          'office-ui-fabric-react$': path.join(__dirname, '../../packages/office-ui-fabric-react/lib'),
          'office-ui-fabric-react/src': path.join(__dirname, '../../packages/office-ui-fabric-react/src'),
          'office-ui-fabric-react/lib': path.join(__dirname, '../../packages/office-ui-fabric-react/lib'),
          '@uifabric/api-docs/lib': path.join(__dirname, '../../packages/api-docs/lib')
        }
      }
    }),
    isProductionArg
  ); /* only production */
};
