let path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'office-ui-fabric-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

let entry = {
  [BUNDLE_NAME]: './lib/index.js'
};

// In production builds, produce the demo-app bundle.
if (IS_PRODUCTION) {
  entry['demo-app'] = './lib/demo/index.js';
}

module.exports = resources.createConfig(
  BUNDLE_NAME,
  IS_PRODUCTION,
  {
    entry,

    output: {
      libraryTarget: 'var',
      library: 'Fabric'
    },

    externals: [
      {
        'react': 'React',
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],

    resolve: {
      alias: {
        'office-ui-fabric-react/src': path.join(__dirname, 'src'),
        'office-ui-fabric-react/lib': path.join(__dirname, 'lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }

  }
);
