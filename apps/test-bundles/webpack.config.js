const path = require('path');
const fs = require('fs');
const resources = require('../../scripts/webpack/webpack-resources');

// Files which should not be considered top-level entries.
const TopLevelEntryFileExclusions = ['index.js', 'version.js', 'index.bundle.js'];

// Helper to resolve the path to an entry name for a given package.
const resolvePath = (packageName, entryFileName = 'index.js') =>
  path.join(path.dirname(require.resolve(packageName)).replace('lib-commonjs', 'lib'), entryFileName);

// Create entries for all top level imports.
const Entries = _buildEntries('office-ui-fabric-react');
_buildEntries('@fluentui/react-next', Entries);

// Create entries for single top level import.
Entries['react-button'] = resolvePath('@fluentui/react-button');
Entries['react-compose'] = resolvePath('@fluentui/react-compose');
Entries['keyboard-key'] = resolvePath('@fluentui/keyboard-key');

// Note: The experimental button bundle evaluation seems to be slowing down PRs
// significantly. Commenting out for now.

// Entries['experiments-Button'] = resolvePath('@uifabric/experiments', 'Button.js');

module.exports = Object.keys(Entries).map(
  entryName =>
    resources.createConfig(
      entryName,
      true,
      {
        entry: {
          [entryName]: Entries[entryName],
        },
        externals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // plugins: [
        //   {
        //     apply: compiler => {
        //       compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => _copyStats('office-ui-fabric-react'));
        //     }
        //   }
        // ]
      },
      true,
      true,
    )[0],
);

/**
 * Copy the stats file to dist folder the package the bundles were generated from.
 */
// function _copyStats(packageName) {
//   try {
//     fs.copyFileSync(
//       path.join(__dirname, 'dist/test-bundles.stats.html'),
//       path.resolve(__dirname, `../../packages/${packageName}/dist/${StatsFileName}.stats.html`)
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }

/**
 * Build webpack entries based on top level imports available in a package.
 */
function _buildEntries(packageName, entries = {}) {
  let packagePath = '';

  try {
    packagePath = path.dirname(require.resolve(packageName)).replace('lib-commonjs', 'lib');
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

      // Replace commonjs paths with lib paths.
      const entryPath = path.join(packagePath, itemName);

      entries[`${packageName.replace('@', '').replace('/', '-')}-${entryName}`] = entryPath;
    }
  });

  return entries;
}
