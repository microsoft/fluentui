// @ts-check
const { resources } = require('@fluentui/scripts-webpack');

const BUNDLE_NAME = 'fluentui-react';

/**
 * @param {object} param0
 * @param {string | import("webpack").Configuration['output']} param0.output - If a string, name for the output varible.
 * If an object, full custom `output` config.
 * @param {boolean} param0.onlyProduction
 */
function createConfig({ output, onlyProduction }) {
  return resources.createBundleConfig({
    bundleName: BUNDLE_NAME,
    output,
    entry: './lib/index.bundle.js',
    onlyProduction,
  });
}

module.exports = [
  ...createConfig({
    output: 'FluentUIReact',
    onlyProduction: false,
  }),
  ...createConfig({
    output: {
      libraryTarget: 'umd',
      library: 'FluentUIReact',
      filename: `${BUNDLE_NAME}.umd.js`,
    },
    onlyProduction: true,
  }),
];
