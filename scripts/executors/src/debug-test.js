const path = require('path');
const { findConfig } = require('@fluentui/scripts-utils');
const { findGitRoot } = require('@fluentui/scripts-monorepo');

const configPath = findConfig('jest.config.js');
const rootPath = findGitRoot();

if (!configPath || !rootPath) {
  console.log(
    'Unable to find jest.config.js relative to currently opened file. Run debug-test from an open source file in a jest enabled project.',
  );
} else {
  const jestCli = require.resolve('jest-cli/bin/jest');
  process.chdir(path.dirname(configPath));
  require(jestCli);
}
