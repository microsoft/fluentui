const { getResolveAlias, resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createServeConfig({
  entry: './src/index.bundle.ts',

  output: {
    filename: 'fluentui-react.js',
    libraryTarget: 'var',
    library: 'FluentUIReact',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: getResolveAlias(),
  },
});
