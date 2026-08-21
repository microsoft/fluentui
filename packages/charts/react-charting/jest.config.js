const { createV8Config: createConfig } = require('@fluentui/scripts-jest');
const { existsSync, readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');

function getEsmOnlyPackagesToCjsMapping() {
  const findPackageRoot = (libraryName, resolveFrom = __dirname) => {
    let packageRoot = dirname(require.resolve(libraryName, { paths: [resolveFrom] }));

    while (packageRoot !== dirname(packageRoot)) {
      const packageJsonPath = join(packageRoot, 'package.json');

      if (existsSync(packageJsonPath) && JSON.parse(readFileSync(packageJsonPath, 'utf8')).name === libraryName) {
        return packageRoot;
      }

      packageRoot = dirname(packageRoot);
    }

    throw new Error(`Could not resolve package root for ${libraryName}`);
  };

  const createD3LibMappingToCommonJs = libraryName => {
    const resolveFrom = libraryName === 'd3-path' ? findPackageRoot('d3-shape') : __dirname;

    return join(findPackageRoot(libraryName, resolveFrom), 'dist', `${libraryName}.js`);
  };

  const d3Libs = [
    'd3-scale',
    'd3-interpolate',
    'd3-color',
    'd3-shape',
    'd3-path',
    'd3-axis',
    'd3-array',
    'd3-time',
    'd3-hierarchy',
    'd3-selection',
    'd3-format',
  ];

  /**
   * map of packages that ship only as ESM. All our d3 dependencies are ES5 except d3-scale package.
   * We had to upgrade the d3-scale to an ESM only package because of a security vulnerability in older versions.
   * See https://github.com/d3/d3-scale/issues/269 and https://github.com/d3/d3-color/pull/100
   * The current version of jest does not support ESM only packages.
   * So we need to map these packages to their CommonJS versions.
   *
   */
  const cjsPathsToEsmOnlyPackages = d3Libs.reduce((acc, lib) => {
    acc[`^${lib}$`] = createD3LibMappingToCommonJs(lib);
    return acc;
  }, {});

  return cjsPathsToEsmOnlyPackages;
}

const config = createConfig({
  setupFiles: ['./config/tests.js', 'jest-canvas-mock'],
  snapshotSerializers: [require.resolve('@fluentui/jest-serializer-merge-styles')],
  setupFilesAfterEnv: ['./config/setup-env.js'],
  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
