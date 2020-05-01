const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolveCwd } = require('just-scripts');
const path = require('path');

module.exports = {
  transform: {
    ...tsjPreset.transform,
  },
  testRegex: '/test/.*-test\\.tsx?$',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: resolveCwd('tsconfig.json'),
      packageJson: resolveCwd('package.json'),
    },
  },
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  setupFilesAfterEnv: [path.join(__dirname, 'jestSetup.fluent-ui-react.js')],
  verbose: false,
};
