const { getResolveAlias, resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createServeConfig({
  entry: './src/index.ts',

  output: {
    filename: 'react-charting.js',
    libraryTarget: 'var',
    library: 'FluentUIReactCharting',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: getResolveAlias(),
  },
});
