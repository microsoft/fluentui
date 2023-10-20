import { spawnSync } from 'child_process';
import * as path from 'path';

import * as fs from 'fs-extra';
import { IOptions as GlobOptions, sync as globSync } from 'glob';
import _ from 'lodash';
import { ReplaceResult, sync as replaceInFileSync } from 'replace-in-file';
import { PackageInfo, findGitRoot, listAllTrackedFiles, stageAndCommit } from 'workspace-tools';

const { runPrettier } = require('./prettier');
const { readConfig: _readConfig, writeConfig: _writeConfig } = require('./utils');

const readConfig: (pth: string) => PackageInfo = _readConfig;
const writeConfig: (pth: string, newValue: unknown) => void = _writeConfig;

const gitRoot = findGitRoot(process.cwd());
/**
 * Things that can come before a package name/path: string start, `/`, `!` (loader path),
 * space, start of line
 */
const nameStartLookbehind = '(?<=[\'"`/! ]|^)';
/**
 * Things that can come after a package name: string end, `/`, space, `@` (certain URLs),
 * end of line
 */
const nameEndLookahead = '(?=[\'"`/ @]|$)';

const getPackageNameParts = (packageName: string): [string | undefined, string] =>
  // eslint-disable-next-line no-sparse-arrays
  packageName[0] === '@' ? (packageName.split('/') as [string, string]) : [, packageName];

const getPackagePath = (unscopedPackageName: string) => {
  const packagesPath = path.join(gitRoot, 'packages', unscopedPackageName);
  return fs.existsSync(packagesPath) ? packagesPath : path.join(gitRoot, 'apps', unscopedPackageName);
};

const getPackageJson = (unscopedPackageName: string) =>
  readConfig(path.join(getPackagePath(unscopedPackageName), 'package.json'));

const getChangedFiles = (results: ReplaceResult[]) => results.filter(res => res.hasChanged).map(res => res.file);

interface RenameInfo {
  oldScope: string;
  /** Old unscoped name */
  oldUnscopedName: string;
  newScope: string;
  /** New unscoped name */
  newUnscopedName: string;
  newVersion: string;
  packageJson: PackageInfo;
}

function getPackageToRename(): RenameInfo {
  const [oldNameArg, newNameArg, versionArg] = process.argv.slice(2);

  if (oldNameArg) {
    const [oldScope = '@uifabric', oldUnscopedName] = getPackageNameParts(oldNameArg);
    const [newScope = '@fluentui', newUnscopedName] = getPackageNameParts(newNameArg || oldUnscopedName);
    const packageJson = getPackageJson(oldUnscopedName);
    return {
      oldUnscopedName,
      oldScope,
      newUnscopedName,
      newScope,
      packageJson,
      newVersion: versionArg || packageJson.version,
    };
  } else {
    console.log('Usage:\n  yarn rename-package <old-name> [<new-name> [<new-version>]]');
    process.exit(1);
  }
}

function updatePackage(renameInfo: RenameInfo): string[] {
  const { oldUnscopedName, oldScope, newUnscopedName, newScope, packageJson, newVersion } = renameInfo;

  const oldPath = getPackagePath(oldUnscopedName);
  // Replace just the last section so it lands under the correct one of /apps or /packages
  const newPath = oldPath.replace(new RegExp(`${oldUnscopedName}$`), newUnscopedName);

  const newPackageJsonPath = path.join(newPath, 'package.json');

  if (oldPath !== newPath) {
    console.log(`\nMoving package from ${oldPath} to ${newPath}`);
    fs.renameSync(oldPath, newPath);

    const oldExamplesPath = path.join(getPackagePath('react-examples'), 'src', oldUnscopedName);
    let newExamplesPath: string | undefined;
    if (fs.existsSync(oldExamplesPath)) {
      newExamplesPath = path.join(getPackagePath('react-examples'), 'src', newUnscopedName);
      console.log(`\nMoving examples from ${oldPath} to ${newPath}`);
      fs.renameSync(oldExamplesPath, newExamplesPath);
    }

    const apiFilePath = path.join(newPath, 'etc', `${oldUnscopedName}.api.md`);
    if (fs.existsSync(apiFilePath)) {
      fs.renameSync(apiFilePath, apiFilePath.replace(path.basename(apiFilePath), `${newUnscopedName}.api.md`));
    }

    console.log('\nCommitting the file moves only');
    stageAndCommit(
      [oldPath, newPath, ...(newExamplesPath ? [oldExamplesPath, newExamplesPath] : [])],
      `Rename ${oldScope}/${oldUnscopedName} to ${newScope}/${newUnscopedName}`,
      gitRoot,
    );
  } else {
    console.log(`\nPackage does not need to be moved from ${oldPath}`);
  }

  console.log('\nUpdating name and version in package.json');
  packageJson.name = `${newScope}/${newUnscopedName}`;
  packageJson.version = newVersion;
  writeConfig(newPackageJsonPath, packageJson);

  return [newPackageJsonPath];
}

function updateDependents(renameInfo: RenameInfo): string[] {
  const { oldUnscopedName, oldScope, newUnscopedName, newScope, newVersion } = renameInfo;
  console.log('\nUpdating name and version in other package.json files');

  const glob: GlobOptions = {
    cwd: gitRoot,
  };

  const depResults = replaceInFileSync({
    files: '{apps,packages,packages/fluentui}/*/package.json',
    from: new RegExp(`"${oldScope}/${oldUnscopedName}": "([~^<>= ]*)\\d+\\.\\d+\\.\\d+(-.*)?"`),
    to: `"${newScope}/${newUnscopedName}": "$1${newVersion}"`,
    glob,
  });

  const changedPackageJson = getChangedFiles(depResults);
  console.log(`  ${changedPackageJson.join('\n  ')}`);
  return changedPackageJson;
}

function updateReferences(renameInfo: RenameInfo): string[] {
  console.log('\nReplacing old package name and path in all tracked files (this will take awhile)...');

  const files = listAllTrackedFiles([], gitRoot).filter(f => !/CHANGELOG/.test(f));

  const { oldUnscopedName, oldScope, newUnscopedName, newScope } = renameInfo;

  // Replace name references (@uifabric/utilities) AND path references (packages/utilities).
  // To prevent replacing other package names which share substrings, use a fancy regex.
  const nameRegex = new RegExp(
    `${nameStartLookbehind}(${oldScope}|apps|packages|react-examples/(src|lib))/${oldUnscopedName}${nameEndLookahead}`,
  );

  let lastUpdatedFile = '';

  const results = replaceInFileSync({
    files,
    from: new RegExp(nameRegex.source, 'gm'),
    to: (substr, ...args) => {
      const file = args.slice(-1)[0];
      if (lastUpdatedFile !== file) {
        console.log(`  updating ${file}`);
        lastUpdatedFile = file;
      }

      const match = nameRegex.exec(substr);
      if (!match) {
        throw new Error('no matches found');
      }
      // This is the scope or the packages or apps section of the path
      const firstPart = match[1] === oldScope ? newScope : match[1];
      return `${firstPart}/${newUnscopedName}`;
    },
  });

  return getChangedFiles(results);
}

function updateConfigs(renameInfo: RenameInfo): string[] {
  console.log('\nUpdating config files...');

  const { oldUnscopedName, newUnscopedName } = renameInfo;

  // Rename API file if it exists
  const oldApiFile = path.join(getPackagePath(newUnscopedName), 'dist', oldUnscopedName + '.api.md');
  if (fs.existsSync(oldApiFile)) {
    fs.renameSync(oldApiFile, path.join(getPackagePath(newUnscopedName), 'dist', newUnscopedName + '.api.md'));
  }

  const results: ReplaceResult[] = [
    // PR deploy site
    ...replaceInFileSync({
      files: path.join(gitRoot, 'apps/pr-deploy-site/pr-deploy-site.js'),
      from: new RegExp(`\\./${oldUnscopedName}/`, 'g'),
      to: `./${newUnscopedName}/`,
    }),
    // API docs config
    ...replaceInFileSync({
      files: path.join(gitRoot, 'packages/api-docs/config/api-docs.js'),
      from: `../../${oldUnscopedName}/dist/${oldUnscopedName}`,
      to: `../../${newUnscopedName}/dist/${newUnscopedName}`,
    }),
  ];

  const newPackagePath = getPackagePath(newUnscopedName);
  const bundleFiles = globSync(path.join(newPackagePath, 'webpack*.js'));

  if (bundleFiles.length) {
    // Assorted special files which are known to reference bundle names
    bundleFiles.push(
      path.join(gitRoot, 'packages/react-docsite-components/src/components/CodepenComponent/CodepenComponent.tsx'),
      path.join(gitRoot, 'packages/react-monaco-editor/src/transpiler/transpileHelpers.test.ts'),
      path.join(gitRoot, 'packages/react-monaco-editor/src/utilities/defaultSupportedPackages.ts'),
      path.join(gitRoot, 'packages/react-monaco-editor/src/transpiler/__snapshots__/exampleTransform.test.ts.snap'),
    );

    // Replace the bundle name and the library name in any webpack configs
    // (these names aren't the same in all packages)
    const oldBundleNameMaybe = 'Fabric' + _.upperFirst(_.camelCase(oldUnscopedName));
    const newBundleName = 'FluentUI' + _.upperFirst(_.camelCase(newUnscopedName));

    results.push(
      ...replaceInFileSync({
        files: bundleFiles,
        from: new RegExp(`${oldBundleNameMaybe}|${oldUnscopedName}`, 'g'),
        to: substr => {
          return substr === oldBundleNameMaybe ? newBundleName : newUnscopedName;
        },
      }),
    );
  }

  return getChangedFiles(results);
}

async function runPrettierForFiles(modifiedFiles: string[]) {
  console.log('\nRunning prettier on changed files...');
  await runPrettier(modifiedFiles, { logErrorsOnly: true });
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
  const renameInfo = getPackageToRename();

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
- Run a search for the old scoped and unscoped package names in case of non-standard references.
  This regex might help:   ${nameStartLookbehind}${renameInfo.oldUnscopedName}${nameEndLookahead}
- You may need to run a build to ensure API files are properly updated
`);
}

run().catch(err => {
  console.error(err);
});
