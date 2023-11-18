const path = require('path');
const fs = require('fs');
const { workspaceRoot } = require('@nx/devkit');
const { pathsToModuleNameMapper } = require('ts-jest');
const { createV0Config: commonConfig } = require('@fluentui/scripts-jest');

const config = commonConfig({
  displayName: 'react-northstar',
  moduleNameMapper: {
    // Legacy aliases, they should not be used in new tests
    ...getAliases(),
  },
});
config.setupFilesAfterEnv = [...config.setupFilesAfterEnv, './jest-setup.js'];

module.exports = config;

function getAliases() {
  const tsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'tsconfig.spec.json')));
  const tsPathAliases = pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: `<rootDir>/${path.relative(__dirname, workspaceRoot)}/`,
  });

  return tsPathAliases;
}
