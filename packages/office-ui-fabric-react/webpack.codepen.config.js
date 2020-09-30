const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

module.exports = resources.createServeConfig({
  entry: './src/index.bundle.ts',

  output: {
    filename: 'office-ui-fabric-react.js',
    libraryTarget: 'var',
    library: 'Fabric',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: getResolveAlias(),
  },
});
