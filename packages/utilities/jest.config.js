let path = require('path');
let { createConfig } = require('../../scripts/tasks/jest-resources');
module.exports = createConfig({
  setupFiles: [
    path.resolve(__dirname, 'lib/common/tests.js')
  ]
});

console.log(module.exports.setupFiles);