import { execSync } from 'child_process';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { logger } from 'just-scripts';
import yargs from 'yargs';

/**
 * Deprecates a package by executing an `npm deprecate` command.
 *
 * @param name - The name of the package to deprecate.
 * @param npmToken - The npm authentication token.
 * @returns A promise that resolves when the deprecation is successful, or rejects with an error if it fails.
 */
export function deprecatePackage(name: string, npmToken: string) {
  const command = `npm deprecate ${name} "Deprecated in favor of stable release" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${npmToken}`;

  logger.info(command);

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    logger.error(`Failed to deprecate "${name}" package`);
  }
}

/**
 * Retrieves the list of packages to deprecate based on change files in the `change` directory.
 * A package is marked for deprecation if:
 *   - The change file has a type of `minor`
 *   - The change file has a message of `chore: release stable`
 *
 * @returns {string[]} An array of package names to deprecate.
 */
export function getPackagesToDeprecate() {
  const changeDir = join(__dirname, 'change');

  const packagesToDeprecate = readdirSync(changeDir).reduce<string[]>((acc, file) => {
    const filePath = join(changeDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const changeFile = JSON.parse(fileContent);

    if (changeFile.type === 'minor' && changeFile.message === 'chore: release stable') {
      acc.push(changeFile.packageName);
    }

    return acc;
  }, []);

  return packagesToDeprecate;
}

function main() {
  const args = yargs.option('token', { type: 'string', description: 'NPM Token', demandOption: true }).argv;

  const npmToken = args.token;
  const packagesToDeprecate = getPackagesToDeprecate();

  packagesToDeprecate.forEach(pkg => deprecatePackage(pkg, npmToken));
}

if (require.main === module) {
  main();
}
