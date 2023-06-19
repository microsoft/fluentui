/* eslint-disable no-shadow */

// @ts-check
const {
  buildEntries,
  buildEntry,
  createWebpackConfig,
  createFluentNorthstarFixtures,
  createFluentReactFixtures,
  createEntry,
} = require('./webpackUtils');

/**
 *
 * @param {string} packageName
 * @returns
 */
function getEntries(packageName) {
  if (packageName === '@fluentui/react-northstar') {
    createFluentNorthstarFixtures();
    const entries = buildEntries('@fluentui/react-northstar');
    return entries;
  }

  if (packageName === '@fluentui/react') {
    createFluentReactFixtures();
    createEntry('@fluentui/keyboard-key');

    const entries = buildEntries('@fluentui/react');
    entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');
    return entries;
  }

  console.error('🚨 packageName needs to be one of `@fluentui/react` or `@fluentui/react-northstar`!');
  process.exit(1);
}

const packageName = process.env.PACKAGE ?? '';

if (!packageName) {
  console.error('🚨 No packageName provided! Set it via env variable name "PACKAGE"');
  process.exit(1);
}
const entries = getEntries(packageName);
const config = createWebpackConfig(entries, packageName);

module.exports = config;
