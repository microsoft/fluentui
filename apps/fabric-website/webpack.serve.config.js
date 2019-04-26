let path = require('path');
let resources = require('../../scripts/webpack/webpack-resources');

const devServerConfig = {
  inline: true,
  port: 4321,
  before: app => {
    const serverOptions = {
      expressInstance: app,
      portNum: 3000, // Not likely to actually be used in practice
      doListen: false,
      isProduction: false
    };

    require('./server').start(serverOptions);
  }
};

const outputConfig = {
  filename: 'fabric-site.js'
};

module.exports = resources.createServeConfig({
  entry: './src/root.tsx',

  output: outputConfig,

  devServer: devServerConfig,

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
      '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
      'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
