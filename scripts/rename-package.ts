import { spawnSync } from 'child_process';
import * as fs from 'fs-extra';
import { IOptions as GlobOptions } from 'glob';
import inquirer from 'inquirer';
import * as _ from 'lodash';
import * as path from 'path';
import * as replaceInFile from 'replace-in-file';
import { findGitRoot, PackageInfo, listAllTrackedFiles, getUnstagedChanges, stageAndCommit } from 'workspace-tools';

const readConfig: (pth: string) => PackageInfo = require('./read-config').readConfig;
const writeConfig: (pth: string, newValue: any) => void = require('./write-config');
const runPrettier = require('./prettier/prettier-helpers').runPrettier;

const gitRoot = findGitRoot(process.cwd());
const uifabric = '@uifabric';
const fluentui = '@fluentui';

const getPackagePath = (unscopedPackageName: string) => {
  const packagesPath = path.join(gitRoot, 'packages', unscopedPackageName);
  return fs.existsSync(packagesPath) ? packagesPath : path.join(gitRoot, 'apps', unscopedPackageName);
};
const getPackageJson = (unscopedPackageName: string) =>
  readConfig(path.join(getPackagePath(unscopedPackageName), 'package.json'));

interface PackageRenameInfo {
  /** Old unscoped name (under `@uifabric`) */
  oldName: string;
  /** New unscoped name (under `@fluentui`) */
  newName: string;
  newVersion: string;
  packageJson: PackageInfo;
}

async function getPackageToRename(): Promise<PackageRenameInfo> {
  const [oldNameArg, newNameArg, versionArg] = process.argv.slice(2);
  let packageJson = oldNameArg ? getPackageJson(oldNameArg) : undefined;

  if (oldNameArg) {
    return {
      oldName: oldNameArg,
      newName: newNameArg || oldNameArg,
      packageJson,
      newVersion: versionArg || packageJson.version,
    };
  }

  const answers = await inquirer.prompt<Pick<PackageRenameInfo, 'oldName' | 'newName' | 'newVersion'>>([
    {
      type: 'input',
      name: 'oldName',
      message: 'Old @uifabric package name (no scope):',
      validate: (input: string) => /^[a-z\d-]+$/.test(input) || 'Must enter a valid unscoped npm package name',
    },
    {
      type: 'input',
      name: 'newName',
      message: 'New @fluentui package name (no scope):',
      validate: (input: string) => /^[a-z\d-]+$/.test(input) || 'Must enter a valid unscoped npm package name',
    },
    {
      type: 'input',
      name: 'newVersion',
      message: answers => {
        packageJson = getPackageJson(answers.oldName);
        return `New version if different (current version: ${packageJson.version})`;
      },
    },
  ]);

  return { ...answers, newVersion: answers.newVersion || packageJson.version, packageJson };
}

function updatePackage(renameInfo: PackageRenameInfo) {
  const { oldName, newName, packageJson, newVersion } = renameInfo;

  const oldPath = getPackagePath(oldName);
  // Replace just the last section so it lands under the correct one of /apps or /packages
  const newPath = oldPath.replace(new RegExp(`${oldName}$`), newName);

  const newPackageJsonPath = path.join(newPath, 'package.json');

  if (oldPath !== newPath) {
    console.log(`\nMoving package from ${oldPath} to ${newPath}`);
    fs.renameSync(oldPath, newPath);
    console.log('\nCommitting the file moves only');
    stageAndCommit([oldPath, newPath], `Rename ${uifabric}/${oldName} to ${fluentui}/${newName}`, gitRoot);
  } else {
    console.log(`\nPackage does not need to be moved from ${oldPath}`);
  }

  console.log('\nUpdating name and version in package.json');
  packageJson.name = `${fluentui}/${newName}`;
  packageJson.version = newVersion;
  writeConfig(newPackageJsonPath, packageJson);
}

function updateDependents(renameInfo: PackageRenameInfo) {
  const { oldName, newName, newVersion } = renameInfo;
  console.log('\nUpdating name and version in other package.json files');

  const glob: GlobOptions = {
    cwd: gitRoot,
  };

  const depResults = replaceInFile.sync({
    files: '{apps,packages,packages/fluentui}/*/package.json',
    from: new RegExp(`"${uifabric}/${oldName}": "([~^<>= ]*)\\d+\\.\\d+\\.\\d+(-.*)?"`),
    to: `"${fluentui}/${newName}": "$1${newVersion}"`,
    glob,
  });

  const dependentPackageFolders = depResults.filter(res => res.hasChanged).map(res => path.dirname(res.file));
  console.log(`  ${dependentPackageFolders.join('\n  ')}`);
}

function updateReferences(renameInfo: PackageRenameInfo) {
  console.log('\nReplacing old package name and path in all tracked files (this will take awhile)...');

  const files = listAllTrackedFiles([], gitRoot).filter(f => !/CHANGELOG/.test(f));

  const { oldName, newName } = renameInfo;

  // Replace name references (@uifabric/utilities) AND path references (packages/utilities).
  // To prevent replacing other package names which share substrings, only replace the name if it's:
  // - Preceded by a string start '"` or / or ! (loader path) or space or start of string
  // - Followed by a string end '"` or / or space or end of string
  const nameRegex = new RegExp(`(?<=['"\`/! ]|^)(${uifabric}|apps|packages)/${oldName}(?=['"\`/ ]|$)`);

  let lastUpdatedFile = '';

  replaceInFile.sync({
    files,
    from: new RegExp(nameRegex.source, 'g'),
    to: (substr, ...args) => {
      const file = args.slice(-1)[0];
      if (lastUpdatedFile !== file) {
        console.log(`  updating ${file}`);
        lastUpdatedFile = file;
      }

      const match = nameRegex.exec(substr);
      // This is the scope or the packages or apps section of the path
      const firstPart = match[1] === uifabric ? fluentui : match[1];
      return `${firstPart}/${newName}`;
    },
  });
}

async function runPrettierForChanged() {
  const changedFiles = getUnstagedChanges(gitRoot);
  console.log('\nRunning prettier on changed files...');
  await runPrettier(changedFiles, true, true);
}

function runYarn() {
  console.log('Running `yarn` to update links...');
  const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: gitRoot, stdio: 'inherit', shell: true });
  if (yarnResult.status !== 0) {
    console.error('Something went wrong with running yarn. Please check previous logs for details');
    process.exit(1);
  }
}

async function run() {
  const renameInfo = await getPackageToRename();

  updatePackage(renameInfo);
  updateDependents(renameInfo);
  updateReferences(renameInfo);
  await runPrettierForChanged();
  runYarn();

  console.log(`
Almost done!

PLEASE VERIFY ALL THE CHANGES ARE CORRECT! (Easy way to view them all: \`git diff -U1\`)

You may also need to run a build to ensure API files are properly updated.
`);
}

run().catch(err => {
  console.error(err);
});
