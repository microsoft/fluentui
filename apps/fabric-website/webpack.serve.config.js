let path = require('path');
let resources = require('../../scripts/webpack/webpack-resources');

let entryPointName = 'fabric-sitev5';

module.exports = resources.createServeConfig({
  entry: {
    [entryPointName]: './src/root.tsx',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker.js'
  },

  output: {
    globalObject: 'self', // required for monaco--see https://github.com/webpack/webpack/issues/6642
    chunkFilename: `${entryPointName}-[name].js`
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
      '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
      '@uifabric/example-app-base$': path.resolve(__dirname, '../../packages/example-app-base/src'),
      'office-ui-fabric-react$': path.join(__dirname, '../../packages/office-ui-fabric-react/lib'),
      'office-ui-fabric-react/src': path.join(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.join(__dirname, '../../packages/office-ui-fabric-react/lib'),
      '@uifabric/example-app-base$': path.join(__dirname, '../../packages/example-app-base/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
