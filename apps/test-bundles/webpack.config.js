const path = require('path');
const fs = require('fs');
const resources = require('../../scripts/tasks/webpack-resources');

// Files which should not be considered top-level entries.
const TopLevelEntryFileExclusions = ['index.js', 'version.js', 'index.bundle.js'];

module.exports = resources.createConfig(
  'test-bundles',
  true,
  {
    entry: _buildEntries('office-ui-fabric-react'),
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  true,
  true
);

function _buildEntries(packageName) {
  const entries = {};
  let packagePath = '';

  try {
    packagePath = path.dirname(require.resolve(packageName));
  } catch (e) {
    console.log(`The package "${packageName}" could not be resolved. Add it as a dependency to this project.`);
    console.log(e);
    return;
  }

  fs.readdirSync(packagePath).forEach(itemName => {
    const isJavascriptFile = itemName.match(/.js$/);
    const isAllowedFile = TopLevelEntryFileExclusions.indexOf(itemName) === -1;

    if (isJavascriptFile && isAllowedFile) {
      const entryName = itemName.replace(/.js$/, '');
      const entryPath = path.join(packagePath, itemName).replace('/lib-commonjs/', '/lib/');

      entries[`${packageName}-${entryName}`] = entryPath;
    }
  });

  return entries;
}
