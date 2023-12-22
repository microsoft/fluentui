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
    '^d3-shape$': prefix + 'node_modules/d3-shape/dist/d3-shape.js',
    '^d3-path$': prefix + 'node_modules/d3-path/dist/d3-path.js',
  };
  return cjsPathsToEsmOnlyPackages;
}

const config = createConfig({
  setupFiles: ['./config/tests.js', 'jest-canvas-mock'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles', 'enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./config/setup-env.js'],
  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
