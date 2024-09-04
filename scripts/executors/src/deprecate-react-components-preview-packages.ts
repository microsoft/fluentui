import { execSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { getAllPackageInfo, workspaceRoot } from '@fluentui/scripts-monorepo';
import { logger } from '@nx/devkit';
import yargs from 'yargs';

/**
 * Deprecates a package by executing an `npm deprecate` command.
 *
 * @param packageSpec - The NPM package name specifier (could be with or without a scope, and optionally tag, version, or version range, for more details see https://docs.npmjs.com/cli/v10/using-npm/package-spec)
 * @param npmToken - The npm authentication token.
 * @returns A promise that resolves when the deprecation is successful, or rejects with an error if it fails.
 */
export function deprecatePackage(packageSpec: string, npmToken: string) {
  const command = `npm deprecate ${packageSpec} "Deprecated in favor of stable release" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${npmToken}`;

  logger.log(`Deprecating "${packageSpec}" package`);
  logger.log(command);

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    logger.error(`Failed to deprecate "${packageSpec}" package`);
  }
}

/**
 * Retrieves the list of v9 preview packages to deprecate based on the following criteria:
 *   - The package has a `vNext` tag
 *   - The package does not have a `-preview` suffix in its name
 *   - The package version is `9.0.0-alpha.0`
 *   - There is a change file for the package with a `minor` type
 *
 * @returns {string[]} An array of package names to deprecate.
 */
export function getPackagesToDeprecate() {
  const readPackageChangeFile = createPackageChangeFileReader();

  const allPackages = getAllPackageInfo();

  const packagesToDeprecate = Object.values(allPackages).reduce<string[]>((acc, { projectConfig, packageJson }) => {
    const changeFile = readPackageChangeFile(projectConfig.name!);

    if (
      projectConfig.tags?.includes('vNext') &&
      !packageJson.name?.endsWith('-preview') &&
      packageJson.version === '9.0.0-alpha.0' &&
      changeFile?.type === 'minor'
    ) {
      acc.push(packageJson.name);
    }

    return acc;
  }, []);

  return packagesToDeprecate;
}

/**
 * Creates a helper function to read a package change file if it exists.
 *
 * @returns A function that takes a package name and returns an change file contents, or null if the change file does not exist.
 */
function createPackageChangeFileReader() {
  const changeDir = join(workspaceRoot, 'change');
  const changeFiles = readdirSync(changeDir);

  return (packageName: string): { type: string; packageName: string } | null => {
    try {
      const changeFilePath = changeFiles.find(file => file.startsWith(`@fluentui-${packageName}`));

      if (!changeFilePath) {
        return null;
      }

      return JSON.parse(readFileSync(join(changeDir, changeFilePath), 'utf8'));
    } catch (e) {
      logger.error(`Failed to read change file for "${packageName}" package`);
      return null;
    }
  };
}

function main() {
  const { token: npmToken } = yargs.option('token', {
    type: 'string',
    description: 'NPM Token',
    demandOption: true,
  }).argv;

  const packagesToDeprecate = getPackagesToDeprecate();

  if (packagesToDeprecate.length === 0) {
    logger.log('No preview to stable packages found. Skipping');
    return;
  }

  packagesToDeprecate.forEach(pkg => deprecatePackage(pkg, npmToken));
}

if (require.main === module) {
  main();
}
