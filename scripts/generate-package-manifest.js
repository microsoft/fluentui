// @ts-check
const path = require('path');
const fs = require('fs-extra');
const semver = require('semver');
const { getAllPackageInfo, findGitRoot } = require('./monorepo/index');

// Generate "manifest" file with package.jsons of all the monorepo packages (mainly for ODSP)

const allPackageInfo = getAllPackageInfo();
const fuirVersion = allPackageInfo['@fluentui/react'].packageJson.version;
const packageInfoString = JSON.stringify(allPackageInfo, null, 2);

const manifestRoot = path.join(findGitRoot(), 'package-manifest');
const dests = [fuirVersion, path.join('latest', String(semver.major(fuirVersion)))];

for (const dest of dests) {
  const destFolder = path.join(manifestRoot, dest);
  fs.mkdirpSync(destFolder);
  fs.writeFileSync(path.join(destFolder, 'package-manifest.json'), packageInfoString);
}
