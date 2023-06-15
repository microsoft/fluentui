// @ts-check
const path = require('path');
const fs = require('fs');

module.exports = /** @type {import('@fluentui/scripts-bundle-size-auditor').Config} */ ({
  extraEntries: ['@fluentui/keyboard-key'],
  createFixtures: config => {
    // Files which should not be considered top-level entries.
    const TopLevelEntryFileExclusions = ['index.js', 'version.js', 'index.bundle.js'];

    const packageName = '@fluentui/react';
    const distPath = path.dirname(require.resolve(packageName).replace('lib-commonjs', 'lib'));
    const packagePath = path.resolve(distPath);

    const fixturesEntries = fs.readdirSync(packagePath).map(itemName => {
      const isFolder = fs.statSync(path.join(packagePath, itemName)).isDirectory();
      const isAllowedFile = itemName && itemName.match(/.js$/) && !TopLevelEntryFileExclusions.includes(itemName);

      if (isAllowedFile && !isFolder) {
        const item = isFolder ? itemName : itemName.replace(/.js$/, '');
        // import everything from package/item path
        const importStatement = `import * as p from '${packageName}/lib/${item}'; console.log(p)`;
        try {
          const folderName = packageName.replace('@fluentui/', '');
          const entryPath = path.join(folderName, `${item}.js`);
          config.writeFixture(entryPath, importStatement);

          return entryPath;
        } catch (err) {
          console.log(err);
        }
      }

      return;
    });

    return fixturesEntries.filter(Boolean);
  },
});
