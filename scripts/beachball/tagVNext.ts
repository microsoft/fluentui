import { execSync } from 'child_process';
import * as semver from 'semver';
import * as tmp from 'tmp';
import * as fs from 'fs';
import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';

function tagPackages() {
  const packagesToTag = getPackagesToTag();
  const { path: npmrcPath, cleanup: cleanupTmpFiles } = createTmpNpmrc();

  packagesToTag.forEach(pkg => {
    tagPackage(pkg.name, pkg.version, npmrcPath);
  });

  cleanupTmpFiles();
}

function tagPackage(name: string, version: string, npmrcPath: string) {
  const prerelease = semver.parse(version).prerelease;
  if (prerelease.length == 0) {
    return;
  }

  const prereleaseTag = prerelease[0];
  const command = `npm dist-tag add ${name}@${version} ${prereleaseTag} --userconfig ${npmrcPath} --registry https://registry.npmjs.org/`;
  console.log(command);
  try {
    const res = execSync(command);
    console.log(res.toString());
  } catch (e) {
    console.error(`failed to tag ${name}@${version}`);
    console.error(e);
  }
}

function getPackagesToTag() {
  const packageInfos: AllPackageInfo = getAllPackageInfo();
  return Object.values(packageInfos)
    .map(packageInfo => {
      if (!packageInfo.packageJson.private && isConvergedPackage(packageInfo.packageJson)) {
        return {
          name: packageInfo.packageJson.name,
          version: packageInfo.packageJson.version,
        };
      }
    })
    .filter(Boolean);
}

function createTmpNpmrc() {
  const tmpDir = tmp.dirSync();

  const npmrc = tmp.fileSync({
    name: '.npmrc',
    dir: tmpDir.name,
  });

  fs.writeFileSync(npmrc.name, '//registry.npmjs.org/:_authToken=${NPM_TOKEN}');

  const cleanup = () => {
    npmrc.removeCallback();
    tmpDir.removeCallback();
  };

  return { path: npmrc.name, cleanup };
}

if (require.main === module && process.env.RELEASE_VNEXT) {
  tagPackages();
}
