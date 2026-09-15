import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { type AllPackageInfo, getAllPackageInfo, workspaceRoot } from '@fluentui/scripts-monorepo';
import { logger, readJsonFile } from '@nx/devkit';
import type { ChangeType } from 'beachball';
import yargs from 'yargs';

import { runNpmCommand } from './npm-utils';

/**
 * Deprecates a package by executing an `npm deprecate` command.
 *
 * @param packageSpec - The NPM package name specifier (could be with or without a scope, and optionally tag, version, or version range, for more details see https://docs.npmjs.com/cli/v10/using-npm/package-spec)
 * @param npmToken - The npm authentication token.
 */
function deprecatePackage(packageSpec: string, npmToken: string) {
  const projectNpmName = packageSpec.replace('-preview', '');
  const args = ['deprecate', packageSpec, `Deprecated in favor of stable release - use/migrate to ${projectNpmName}`];

  logger.log(`Deprecating "${packageSpec}" package`);

  try {
    runNpmCommand({ args, npmToken });
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
 * @param changeFilesRoot - The root folder where change files live (relative to the workspace root).
 * @param packages - The list of all packages in the monorepo.
 * @returns An array of package names to deprecate.
 */
function getPackagesToDeprecate(options: { changeFilesRoot: string; packages: AllPackageInfo }) {
  const { packages } = options;

  const readPackageChangeFile = createPackageChangeFileReader(options);

  const packagesToDeprecate: string[] = [];

  for (const packageInfo of Object.values(packages)) {
    const { projectConfig, packageJson } = packageInfo;

    if (
      projectConfig.tags?.includes('vNext') &&
      !packageJson.name?.endsWith('-preview') &&
      packageJson.version === '9.0.0-alpha.0'
    ) {
      const changeFile = readPackageChangeFile(projectConfig.name!);

      if (changeFile?.type === 'minor') {
        packagesToDeprecate.push(`${packageJson.name}-preview`);
      }
    }
  }

  return packagesToDeprecate;
}

export type DeprecateReactComponentsPreviewPackagesOptions = {
  argv: { changeFilesRoot: string; token: string };
  packages: AllPackageInfo;
};

/**
 *  Deprecates React Components v9 preview packages
 **/
export function deprecateReactComponentsPreviewPackages(options: DeprecateReactComponentsPreviewPackagesOptions) {
  const { argv } = options;

  const packagesToDeprecate = getPackagesToDeprecate({
    changeFilesRoot: argv.changeFilesRoot,
    packages: options.packages,
  });

  if (packagesToDeprecate.length === 0) {
    logger.log('No preview to stable packages found. Skipping');
    return;
  }

  logger.log('Packages to deprecate:', packagesToDeprecate);

  packagesToDeprecate.forEach(pkg => deprecatePackage(pkg, argv.token));
}

/**
 * Creates a helper function to read a package change file if it exists.
 *
 * @returns A function that takes a package name and returns an change file contents, or null if the change file does not exist.
 */
function createPackageChangeFileReader(options: { changeFilesRoot: string }) {
  const changeDir = join(workspaceRoot, options.changeFilesRoot);

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
  try {
    const argv = yargs.option('changeFilesRoot', {
      type: 'string',
      description: 'Root folder where change files live (relative to workspace root)',
      default: 'change',
    }).argv;
    const token = process.env.TOKEN;
    if (!token) {
      throw new Error('Please pass an NPM token through the TOKEN environment variable');
    }

    deprecateReactComponentsPreviewPackages({ argv: { ...argv, token }, packages: getAllPackageInfo() });
  } catch (e) {
    logger.error(e);
    logger.error('Failed to deprecate packages');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
