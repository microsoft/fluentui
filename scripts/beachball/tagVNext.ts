import { getScopes } from './getScopes';
import { execSync } from 'child_process';
import * as semver from 'semver';
import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';

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

packagesToTag.forEach(pkg => {
  const prereleaseTag = semver.parse(pkg.version).prerelease[0];
  const command = `npm dist-tag add ${pkg.name}@${pkg.version} ${prereleaseTag} --//registry.npmjs.org/:_authToken=\${NPM_TOKEN}`;
  console.log(command);
  try {
    const res = execSync(command);
    console.log(res.toString());
  } catch (e) {
    console.error(`failed to tag ${pkg.name}@${pkg.version}`);
    console.error(e);
  }
});
