const path = require('path');
const fs = require('fs');

/**
 * @typedef {{
  type: 'none' | 'prerelease' | 'patch' | 'minor' | 'major';
  comment: string;
  packageName: string;
  email: string;
  dependentChangeType: 'none' | 'patch';
}} ChangeFile
 */

const isExecutedFromCli = require.main === module;

if (isExecutedFromCli) {
  const changefilesRootPath = path.resolve(__dirname, '../../change');
  main(changefilesRootPath);
}

/**
 * Utility for web-components-v3 development branch to double check we dont accidentally introduce chain of changes,
 * which could result in releasing/bumping monorepo packages beside `@fluentui/web-components` !
 *
 * ⚠️ TODO:
 * - This functionality NEEDS to be REMOVED prior merging to master
 * - Usage needs to be removed from .github/workflows/check-packages.yml
 */
function main(/** @type {string} */ root) {
  if (!fs.existsSync(root)) {
    console.log('✅ Changes folder does not exist, skipping check.');
    return;
  }

  const changeFiles = fs.readdirSync(root, 'utf8');

  const invalidChangeFiles = /** @type string [] */ (changeFiles
    .map(changeFilePath => {
      const filePath = path.join(root, changeFilePath);
      /** @type {ChangeFile} */
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (content.packageName === '@fluentui/web-components') {
        return;
      }

      if (content.type !== 'none' || content.dependentChangeType !== 'none') {
        return changeFilePath;
      }
    })
    .filter(Boolean));

  if (invalidChangeFiles.length > 0) {
    console.error('================');
    console.error(`You commited changefiles with not allowed type/dependentChangeType!`);
    console.error(
      `Changefiles that are not for @fluentui/web-components need to have type and dependentChangeType set to "none"`,
    );
    console.error();
    console.error('Invalid change files:');
    console.error(invalidChangeFiles.join('\n'));
    console.error('================');

    process.exit(1);
  }

  console.log('✅ All changefiles are valid.');
}

exports.main = main;
