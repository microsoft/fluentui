import { spawnSync } from 'child_process';
import * as fs from 'fs-extra';
import { IOptions as GlobOptions, sync as globSync } from 'glob';
import inquirer from 'inquirer';
import _ from 'lodash';
import * as path from 'path';
import * as replaceInFile from 'replace-in-file';
import { findGitRoot, PackageInfo, listAllTrackedFiles, stageAndCommit } from 'workspace-tools';

const readConfig: (pth: string) => PackageInfo = require('./read-config').readConfig;
const writeConfig: (pth: string, newValue: any) => void = require('./write-config');
const { runPrettier, prettierExtensions } = require('./prettier/prettier-helpers');

const gitRoot = findGitRoot(process.cwd());
const uifabric = '@uifabric';
const fluentui = '@fluentui';

const getPackagePath = (unscopedPackageName: string) => {
  const packagesPath = path.join(gitRoot, 'packages', unscopedPackageName);
  return fs.existsSync(packagesPath) ? packagesPath : path.join(gitRoot, 'apps', unscopedPackageName);
};
const getPackageJson = (unscopedPackageName: string) =>
  readConfig(path.join(getPackagePath(unscopedPackageName), 'package.json'));

interface RenameInfo {
  /** Old unscoped name (under `@uifabric`) */
  oldName: string;
  /** New unscoped name (under `@fluentui`) */
  newName: string;
  newVersion: string;
  packageJson: PackageInfo;
}

async function getPackageToRename(): Promise<RenameInfo> {
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

  const answers = await inquirer.prompt<Pick<RenameInfo, 'oldName' | 'newName' | 'newVersion'>>([
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

function updatePackage(renameInfo: RenameInfo): string[] {
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

  return [newPackageJsonPath];
}

function updateDependents(renameInfo: RenameInfo): string[] {
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

  const changedPackageJson = depResults.filter(res => res.hasChanged).map(res => res.file);
  console.log(`  ${changedPackageJson.join('\n  ')}`);
  return changedPackageJson;
}

function updateReferences(renameInfo: RenameInfo): string[] {
  console.log('\nReplacing old package name and path in all tracked files (this will take awhile)...');

  const files = listAllTrackedFiles([], gitRoot).filter(f => !/CHANGELOG/.test(f));

  const { oldName, newName } = renameInfo;

  // Replace name references (@uifabric/utilities) AND path references (packages/utilities).
  // To prevent replacing other package names which share substrings, only replace the name if it's:
  // - Preceded by a string start or / or ! (loader path) or space or start of line
  // - Followed by a string end or / or space or @ (certain URLs) or end of line
  const nameRegex = new RegExp(`(?<=['"\`/! ]|^)(${uifabric}|apps|packages)/${oldName}(?=['"\`/ @]|$)`);

  let lastUpdatedFile = '';

  const results = replaceInFile.sync({
    files,
    from: new RegExp(nameRegex.source, 'gm'),
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

  return results.filter(res => res.hasChanged).map(res => res.file);
}

function updateConfigs(renameInfo: RenameInfo): string[] {
  const { oldName, newName } = renameInfo;

  const newPackagePath = getPackagePath(newName);
  const bundleFiles = globSync(path.join(newPackagePath, 'webpack*.js'));

  if (!bundleFiles.length) {
    return [];
  }

  console.log('\nUpdating bundle names...');

  // Assorted special files which are known to reference bundle names
  bundleFiles.push(
    path.join(gitRoot, 'packages/example-app-base/src/components/CodepenComponent/CodepenComponent.tsx'),
    path.join(gitRoot, 'packages/tsx-editor/src/transpiler/transpileHelpers.test.ts'),
    path.join(gitRoot, 'packages/tsx-editor/src/utilities/defaultSupportedPackages.ts'),
    path.join(gitRoot, 'packages/tsx-editor/src/transpiler/__snapshots__/exampleTransform.test.ts.snap'),
  );

  // Replace the bundle name and the library name in any webpack configs
  // (these names aren't the same in all packages)
  const oldBundleNameMaybe = 'Fabric' + _.upperFirst(_.camelCase(oldName));
  const newBundleName = 'FluentUI' + _.upperFirst(_.camelCase(newName));

  for (const configPath of bundleFiles) {
    let content = fs.readFileSync(configPath, 'utf8');
    content = content.replace(new RegExp(oldBundleNameMaybe, 'g'), newBundleName);
    content = content.replace(new RegExp(oldName, 'g'), newName);
    fs.writeFileSync(configPath, content);
  }

  return bundleFiles;
}

async function runPrettierForFiles(modifiedFiles: string[]) {
  // Only run prettier on supported extensions (note: the slice() is because extname returns
  // .extension but prettierExtensions doesn't include the leading . )
  const filesToFormat = modifiedFiles.filter(f => prettierExtensions.includes(path.extname(f).slice(1)));
  if (filesToFormat.length) {
    console.log('\nRunning prettier on changed files...');
    await runPrettier(filesToFormat, true, true);
  }
}

function runYarn() {
  console.log('\nRunning `yarn` to update links...');
  const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: gitRoot, stdio: 'inherit', shell: true });
  if (yarnResult.status !== 0) {
    console.error('Something went wrong with running yarn. Please check previous logs for details');
    process.exit(1);
  }
}

async function run() {
  const renameInfo = await getPackageToRename();

  const modifiedFiles = [
    ...updatePackage(renameInfo),
    ...updateDependents(renameInfo),
    ...updateReferences(renameInfo),
    ...updateConfigs(renameInfo),
  ];

  await runPrettierForFiles(modifiedFiles);

  runYarn();

  console.log(`
Almost done!

PLEASE VERIFY ALL THE CHANGES ARE CORRECT! (Easy way to view them all: \`git diff -U1\`)

Other follow-up steps:
- Run a search for the old scoped and unscoped package names in case of non-standard references
- You may need to run a build to ensure API files are properly updated
`);
}

run().catch(err => {
  console.error(err);
});
