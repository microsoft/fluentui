let path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const ManifestServicePlugin = require('@uifabric/webpack-utils/lib/ManifestServicePlugin');

const BUNDLE_NAME = 'office-ui-fabric-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

let entry = {
  [BUNDLE_NAME]: './lib/index.bundle.js'
};

function createConfig(config, onlyProduction) {
  return resources.createConfig(
    BUNDLE_NAME,
    IS_PRODUCTION,
    {
      entry,

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
          'office-ui-fabric-react/src': path.join(__dirname, 'src'),
          'office-ui-fabric-react/lib': path.join(__dirname, 'lib'),
          'Props.ts.js': 'Props',
          'Example.tsx.js': 'Example'
        }
      },

      ...config
    },
    onlyProduction
  );
}

module.exports = [
  ...createConfig(
    {
      output: {
        libraryTarget: 'var',
        library: 'Fabric'
      }
    },
    false
  ),
  ...createConfig(
    {
      plugins: [new ManifestServicePlugin()],
      output: {
        libraryTarget: 'umd',
        library: 'Fabric',
        filename: `${BUNDLE_NAME}.umd.js`
      }
    },
    true
  )
];
