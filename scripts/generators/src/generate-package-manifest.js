/**
 * This is used solely for V8 release.
 * {@link file://./../../azure-pipelines.release.yml}
 */

const fs = require('fs');
const path = require('path');

const { getAllPackageInfo, workspaceRoot } = require('@fluentui/scripts-monorepo');
const semver = require('semver');

main('v8', path.join(workspaceRoot, 'package-manifest'), '@fluentui/react');

/**
 * Generate "manifest" JSON file with map of package.json of monorepo packages that belong under provided tag group
 * @remarks This is mainly/only for ODSP
 * @param {string} tag - based on this only project containing this tag will be processed
 * @param {string} manifestRoot - directory path where it should be generated
 * @param {string} rootPackage
 */
function main(tag, manifestRoot, rootPackage) {
  const allPackageInfo = getAllPackageInfo();

  const filteredPackages = Object.entries(allPackageInfo).reduce((acc, curr) => {
    const projectJsonPath = path.join(curr[1].packagePath, 'project.json');
    /** @type {import('@nx/devkit').ProjectConfiguration}  */
    const projectJson = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
    const { tags = [], projectType } = projectJson;

    if (projectType === 'application') {
      return acc;
    }

    if (tags.length === 0) {
      return acc;
    }

    if (tags.indexOf(tag) !== -1) {
      acc[curr[0]] = curr[1];
    }

    return acc;
  }, /** @type {typeof allPackageInfo} */ ({}));

  const rootPackageVersion = filteredPackages[rootPackage].packageJson.version;
  const packageInfoString = JSON.stringify(filteredPackages, null, 2);

  const dests = [rootPackageVersion, path.join('latest', String(semver.major(rootPackageVersion)))];

  for (const dest of dests) {
    const destFolder = path.join(manifestRoot, dest);
    fs.mkdirSync(destFolder, { recursive: true });
    fs.writeFileSync(path.join(destFolder, 'package-manifest.json'), packageInfoString, 'utf8');
  }

  console.log('Manifest generated:\n');
  console.log(getFileList(manifestRoot).join('\n'));
}

/**
 * @param {string} dirName
 */
function getFileList(dirName) {
  /** @type {string[]} */
  let files = [];
  const items = fs.readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
}
