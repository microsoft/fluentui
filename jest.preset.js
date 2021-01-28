// const nxPreset = require('@nrwl/jest/preset');

const tsConfig = require('./tsconfig.base.json');
const { resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');

const { paths } = tsConfig.compilerOptions;

const aliases = Object.entries(paths).reduce((acc, [alias, pathsArr]) => {
  acc[`^${alias}$`] = `<rootDir>/../../${pathsArr[0]}`;
  // acc[`^${alias}$`] = `${pathsArr[0]}`;
  return acc;
}, {});

const moduleNameMapper = { '\\.(scss)$': require.resolve('@fluentui/scripts/jest/jest-style-mock'), ...aliases };

console.log({ aliases });

// process.exit(1);

const baseConfig = {
  rootDir: '.',
  snapshotSerializers: [resolveMergeStylesSerializer()],
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
    // custom path
    '/lib-commonjs/',
  ],
  //
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
  testURL: 'http://localhost',
  moduleNameMapper,
  cacheDirectory: '<rootDir>/.cache/jest',
  clearMocks: true,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = { /* ...nxPreset, */ ...baseConfig };
