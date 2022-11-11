let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
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
    '^d3-scale$': prefix + 'node_modules/d3-scale/dist/d3-scale.min.js',
    '^d3-array$': prefix + 'node_modules/d3-scale/node_modules/d3-array/dist/d3-array.min.js',
    '^d3-interpolate$': prefix + 'node_modules/d3-interpolate/dist/d3-interpolate.min.js',
    '^d3-color$': prefix + 'node_modules/d3-color/dist/d3-color.min.js',
    '^d3-time$': prefix + 'node_modules/d3-time/dist/d3-time.min.js',
  };
  return cjsPathsToEsmOnlyPackages;
}

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer()],

  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
