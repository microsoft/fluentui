const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolveCwd } = require('just-scripts');
const path = require('path');

module.exports = {
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    ...require('lerna-alias').jest(),
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: resolveCwd('tsconfig.json'),
      packageJson: resolveCwd('package.json'),
    },
  },
  setupFilesAfterEnv: [path.join(__dirname, 'jestSetup.common.js')],
};
