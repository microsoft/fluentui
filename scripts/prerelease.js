/* This script will turn all packages in the repo into a prerelease with the existing version */
const npmFetch = require('npm-registry-fetch');
const fs = require('fs');
const path = require('path');
const semver = require('semver');

const rootFolder = path.join(__dirname, '../');
const rushConfig = JSON.parse(fs.readFileSync(path.join(rootFolder, 'rush.json')).toString());

const newVersions = {};
const preleaseTag = 'beta';

function semverSort(a, b) {
  if (semver.gt(a, b)) {
    return 1;
  }

  if (semver.lt(a, b)) {
    return -1;
  }

  return 0;
}

(async () => {
  await rushConfig.projects.reduce(async (previousPromise, project) => {
    await previousPromise;

    const projectFolder = path.join(rootFolder, project.projectFolder);
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectFolder, 'package.json')));

    let npmInfo = {};

    try {
      const response = await npmFetch(`/${packageJson.name}`);
      npmInfo = await response.json();
    } catch (e) {
      console.log(`cannot fetch ${packageJson.name} from public npm registry`);
    }

    if (npmInfo.versions) {
      const checkedInVersion = packageJson.version;
      const prereleaseVersions = Object.keys(npmInfo.versions).filter(version => version.startsWith(checkedInVersion + '-' + preleaseTag));
      const latestVersion =
        prereleaseVersions.length > 0
          ? prereleaseVersions.sort(semverSort)[prereleaseVersions.length - 1]
          : checkedInVersion + '-' + preleaseTag + '.0';
      const newVersion = semver.inc(latestVersion, 'prerelease', preleaseTag);

      packageJson.version = newVersion;

      newVersions[packageJson.name] = newVersion;
    }
  }, Promise.resolve());

  rushConfig.projects.forEach(project => {
    const projectFolder = path.join(rootFolder, project.projectFolder);
    const packageJsonPath = path.join(projectFolder, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

    if (newVersions[packageJson.name]) {
      packageJson.version = newVersions[packageJson.name];
    }

    Object.keys(newVersions).forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        packageJson.dependencies[dep] = newVersions[dep];
      }

      if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
        packageJson.devDependencies[dep] = newVersions[dep];
      }
    });

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  });
})();
