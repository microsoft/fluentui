
let path = require('path');
let resources = require('../../scripts/tasks/webpack-resources');
const devServerConfig = {
  inline: true,
  port: 4321
};

const outputConfig = {
  filename: 'fabric-sitev5.js'
}

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',

  output: outputConfig,

  devServer: devServerConfig,

  // The website config intentionally doesn't have React as an external because we bundle it
  // to ensure we get a consistent version.

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});

