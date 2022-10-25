let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

function getEsmOnlyPackagesToCjsMapping() {
  /**
   * relative path to monorepo root
   */
  const prefix = `<rootDir>/../../`;
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
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],

  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
