const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

function getEsmOnlyPackagesToCjsMapping() {
  /**
   * relative path to jest cwd
   */
  const prefix = `<rootDir>/`;
  /**
   * map of packages that ship only as ESM. All our d3 dependencies are ES5 except d3-scale package.
   * We had to upgrade the d3-scale to an ESM only package because of a security vulnerability in older versions.
   * See https://github.com/d3/d3-scale/issues/269 and https://github.com/d3/d3-color/pull/100
   * The current version of jest does not support ESM only packages.
   * So we need to map these packages to their CommonJS versions.
   */
  const cjsPathsToEsmOnlyPackages = {
    '^d3-scale$': prefix + '../../node_modules/d3-scale/build/d3-scale.js',
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
