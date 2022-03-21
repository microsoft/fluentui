import { execSync } from 'child_process';
import * as semver from 'semver';
import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';
import yargs from 'yargs';

function tagPackages(npmToken: string) {
  const packagesToTag = getPackagesToTag();

  let success = true;
  packagesToTag.forEach(pkg => {
    if (!tagPackage(pkg.name, pkg.version, npmToken)) {
      success = false;
    }
  });

  if (!success) {
    console.error('failed to tag all packages');
    process.exit(1);
  }
}

function tagPackage(name: string, version: string, npmToken: string): boolean {
  const prerelease = semver.parse(version).prerelease;
  if (prerelease.length == 0) {
    return false;
  }

  const prereleaseTag = prerelease[0];
  const command = `npm dist-tag add ${name}@${version} ${prereleaseTag} --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${npmToken}`;
  console.log(command);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    console.error(`failed to tag ${name}@${version}`);
    console.error(e);
    return false;
  }

  return true;
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

if (require.main === module && process.env.RELEASE_VNEXT) {
  const argv = yargs.argv;

  if (!argv.token || typeof argv.token !== 'string') {
    throw new Error('Please pass an NPM token through the --token argument');
  }

  tagPackages(argv.token);
}
