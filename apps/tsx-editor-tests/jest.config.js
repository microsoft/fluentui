let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = {
  ...createConfig({
    setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

    moduleNameMapper: {
      'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
      '@uifabric/tsx-editor/lib/(.*)$': '@uifabric/tsx-editor/src/$1',
      '@uifabric/example-app-base/lib/(.*)$': '@uifabric/example-app-base/src/$1'
    },

    transform: {
      'monaco-editor': path.join(__dirname, 'monaco-transform.js')
    },

    runInBand: true,

    snapshotSerializers: [resolveMergeStylesSerializer()]
  }),
  // Merge this in later so the default patterns aren't appended
  transformIgnorePatterns: [
    '/lib-commonjs/',
    // Ignore all node_modules except ones with monaco-editor in the path (using negative lookahead)
    '/node_modules/(?!monaco-editor)',
    // Ignore all JS files except ones with monaco-editor in the path (using negative lookbehind)
    '(?<!monaco-editor/.*)\\.js$'
  ]
};

module.exports = config;
