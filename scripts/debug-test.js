const path = require('path');
const findConfig = require('./find-config');

const configPath = findConfig('jest.config.js');
const rushPath = findConfig('rush.json');

if (!configPath || !rushPath) {
  console.log(
    'Unable to find jest.config.js relative to currently opened file. Run debug-test from an open source file in a jest enabled project.');
} else {
  process.chdir(path.dirname(configPath));
  require(path.resolve(path.dirname(rushPath), 'scripts/node_modules/jest-cli/bin/jest'));
}
