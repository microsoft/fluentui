import { getScopes } from './getScopes';
import { execSync } from 'child_process';
import * as semver from 'semver';
import * as tmp from 'tmp';
import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';
import * as fs from 'fs';

process.env.RELEASE_VNEXT = 'true';
const vNextScope = getScopes();
const packageInfos: AllPackageInfo = getAllPackageInfo();
const packagesToTag = Object.values(packageInfos)
  .map(packageInfo => {
    if (vNextScope.includes(packageInfo.packagePath) && isConvergedPackage(packageInfo.packageJson)) {
      return {
        name: packageInfo.packageJson.name,
        version: packageInfo.packageJson.version,
      };
    }
  })
  .filter(Boolean);

const tmpDir = tmp.dirSync();

const npmrc = tmp.fileSync({
  name: '.npmrc',
  dir: tmpDir.name,
});

fs.writeFileSync(npmrc.name, '//registry.npmjs.org/:_authToken=${NPM_TOKEN}');

packagesToTag.forEach(pkg => {
  const prereleaseTag = semver.parse(pkg.version).prerelease[0];
  const command = `npm dist-tag add ${pkg.name}@${pkg.version} ${prereleaseTag} --userconfig ${npmrc.name} --registry https://registry.npmjs.org/`;
  console.log(command);
  try {
    const res = execSync(command);
    console.log(res.toString());
  } catch (e) {
    console.error(`failed to tag ${pkg.name}@${pkg.version}`);
    console.error(e);
  }
});

npmrc.removeCallback();
tmpDir.removeCallback();
