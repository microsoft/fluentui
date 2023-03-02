const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

function getEsmOnlyPackagesToCjsMapping() {
  /**
   * relative path to jest cwd
   */
  const prefix = `<rootDir>/`;
  /**
   * map of packages that ship only as ESM
   */
  const cjsPathsToEsmOnlyPackages = {
    '^d3-scale$': prefix + 'node_modules/d3-scale/dist/d3-scale.js',
    '^d3-array$': prefix + 'node_modules/d3-scale/node_modules/d3-array/dist/d3-array.js',
    '^d3-time$': prefix + 'node_modules/d3-scale/node_modules/d3-time/dist/d3-time.js',
  };
  return cjsPathsToEsmOnlyPackages;
}

const config = createConfig({
  setupFiles: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles', 'enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
