const path = require('path');
const { createConfig } = require('../../scripts/tasks/jest-resources');

module.exports = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))]
});

console.log(module.exports.setupFiles);
