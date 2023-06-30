// @ts-check
const path = require('path');
const fs = require('fs');

module.exports = /** @type {import('@fluentui/scripts-bundle-size-auditor').Config} */ ({
  createFixtures: config => {
    const packageName = '@fluentui/react-northstar';
    const distPath = path.dirname(require.resolve(packageName).replace('commonjs', 'es'));
    const packagePath = path.resolve(distPath, 'components');
    const fixturesEntries = fs.readdirSync(packagePath).map(itemName => {
      const isFolder = fs.statSync(path.join(packagePath, itemName)).isDirectory();

      if (isFolder && itemName) {
        const importStatement = `import { ${itemName} } from '${packageName}'; console.log(${itemName})`;
        try {
          const folderName = packageName.replace('@fluentui/', '');
          const entryPath = path.join(folderName, `${itemName}.js`);
          config.writeFixture(entryPath, importStatement);

          return entryPath;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }

      return;
    });

    return fixturesEntries.filter(Boolean);
  },
});
