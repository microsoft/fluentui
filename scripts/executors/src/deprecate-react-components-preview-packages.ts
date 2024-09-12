import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { getAllPackageInfo, workspaceRoot } from '@fluentui/scripts-monorepo';
import { logger, readJsonFile } from '@nx/devkit';
import type { ChangeType } from 'beachball';
import yargs from 'yargs';

/**
 * Deprecates a package by executing an `npm deprecate` command.
 *
 * @param packageSpec - The NPM package name specifier (could be with or without a scope, and optionally tag, version, or version range, for more details see https://docs.npmjs.com/cli/v10/using-npm/package-spec)
 * @param npmToken - The npm authentication token.
 */
export function deprecatePackage(packageSpec: string, npmToken: string) {
  const command = `npm deprecate ${packageSpec} "Deprecated in favor of stable release" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${npmToken}`;

  logger.log(`Deprecating "${packageSpec}" package`);
  logger.log(command);

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    throw new Error(`Failed to deprecate "${packageSpec}" package`);
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

  const packagesToDeprecate = getAllPackageInfo(({ project, packageJson }) => {
    if (
      project.tags?.includes('vNext') &&
      !packageJson.name?.endsWith('-preview') &&
      packageJson.version === '9.0.0-alpha.0'
    ) {
      const changeFile = readPackageChangeFile(project.name!);

      return changeFile?.type === 'minor';
    }

    return false;
  });

  return Object.keys(packagesToDeprecate);
}

/**
 * Creates a helper function to read a package change file if it exists.
 *
 * @returns A function that takes a package name and returns an change file contents, or null if the change file does not exist.
 */
function createPackageChangeFileReader() {
  const changeDir = join(workspaceRoot, 'change');

  let changeFiles: string[] = [];

  try {
    changeFiles = readdirSync(changeDir);
  } catch (e) {
    throw new Error('Failed to read change files directory');
  }

  return (projectName: string) => {
    const changeFilePath = changeFiles.find(file => file.startsWith(`@fluentui-${projectName}`));

    if (!changeFilePath) {
      return null;
    }

    try {
      return readJsonFile<{ type: ChangeType; packageName: string }>(join(changeDir, changeFilePath));
    } catch (e) {
      throw new Error(`Failed to read change file for "${projectName}" package`);
    }
  };
}

function main() {
  const { token: npmToken } = yargs.option('token', {
    type: 'string',
    description: 'NPM Token',
    demandOption: true,
  }).argv;
  try {
    const packagesToDeprecate = getPackagesToDeprecate();

    if (packagesToDeprecate.length === 0) {
      logger.log('No preview to stable packages found. Skipping');
      return;
    }

    logger.log('Packages to deprecate:', packagesToDeprecate);

    packagesToDeprecate.forEach(pkg => deprecatePackage(pkg, npmToken));
  } catch (e) {
    logger.error(e);
    logger.error('Failed to deprecate packages');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
