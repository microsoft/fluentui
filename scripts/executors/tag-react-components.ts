import { execSync } from 'child_process';

import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '@fluentui/scripts-monorepo';
import * as semver from 'semver';
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
  const prerelease = semver.parse(version)?.prerelease;
  // eslint-disable-next-line eqeqeq
  if (prerelease == null || prerelease.length === 0) {
    return true;
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
  const packageInfos: AllPackageInfo = getAllPackageInfo(isConvergedPackage);
  return Object.values(packageInfos)
    .map(packageInfo => {
      if (!packageInfo.packageJson.private) {
        return {
          name: packageInfo.packageJson.name,
          version: packageInfo.packageJson.version,
        };
      }

      return;
    })
    .filter(Boolean) as Array<{ name: string; version: string }> | [];
}

function main(argv: yargs.Arguments) {
  if (!argv.token || typeof argv.token !== 'string') {
    throw new Error('Please pass an NPM token through the --token argument');
  }

  tagPackages(argv.token);
}

if (require.main === module && process.env.RELEASE_VNEXT) {
  main(yargs.argv);
} else {
  console.log('"RELEASE_VNEXT" not set - skipping');
}
