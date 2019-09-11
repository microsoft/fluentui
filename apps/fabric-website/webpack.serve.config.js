// @ts-check

const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');
const { addMonacoConfig } = require('@uifabric/tsx-editor/scripts/monaco-webpack');

const entryPointName = 'fabric-sitev5';

module.exports = resources.createServeConfig(
  addMonacoConfig({
    entry: {
      [entryPointName]: './src/root.tsx'
    },

    output: {
      chunkFilename: `${entryPointName}-[name].js`
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },

    optimization: {
      removeAvailableModules: false
    },

    resolve: {
      alias: {
        '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
        '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
        '@uifabric/example-app-base$': path.resolve(__dirname, '../../packages/example-app-base/src'),
        'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
        'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  })
);
