// @ts-check
const resources = require('../../scripts/webpack/webpack-resources');
const ManifestServicePlugin = require('@fluentui/webpack-utilities/lib/ManifestServicePlugin');

const BUNDLE_NAME = 'fluentui-react';

/**
 * @param {object} param0
 * @param {string | import("webpack").Output} param0.output - If a string, name for the output varible.
 * If an object, full custom `output` config.
 * @param {boolean} param0.onlyProduction
 * @param {Partial<import("webpack").Configuration>} [param0.config]
 */
function createConfig({ output, onlyProduction, config }) {
  return resources.createBundleConfig({
    bundleName: BUNDLE_NAME,
    output,
    entry: './lib/index.bundle.js',
    customConfig: config,
    onlyProduction,
  });
}

module.exports = [
  ...createConfig({
    output: 'FluentUIReact',
    onlyProduction: false,
  }),
  ...createConfig({
    config: {
      // @ts-ignore
      plugins: [new ManifestServicePlugin()],
    },
    output: {
      libraryTarget: 'umd',
      library: 'FluentUIReact',
      filename: `${BUNDLE_NAME}.umd.js`,
    },
    onlyProduction: true,
  }),
];
