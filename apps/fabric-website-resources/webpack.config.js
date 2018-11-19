let path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'office-ui-fabric-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

let entry = {
  [BUNDLE_NAME]: './lib/index.bundle.js'
};

// In production builds, produce the demo-app bundle.
if (IS_PRODUCTION) {
  entry['demo-app'] = './lib/index.js';
}

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry,

  output: {
    libraryTarget: 'var',
    library: 'Fabric'
  },

  externals: [
    {
      react: 'React'
    },
    {
      'react-dom': 'ReactDOM'
    }
  ],

  resolve: {
    alias: {
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
