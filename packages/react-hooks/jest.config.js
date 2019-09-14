let { createConfig } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@uifabric/utilities/lib/(.*)$': '@uifabric/utilities/lib-commonjs/$1'
  }
});

module.exports = config;
