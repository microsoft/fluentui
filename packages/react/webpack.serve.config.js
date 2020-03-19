const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: {
      '@fluentui/react/src': path.join(__dirname, 'src'),
      '@fluentui/react/lib': path.join(__dirname, 'lib'),
      '@fluentui/react': path.join(__dirname, 'lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example',
    },
  },
});
