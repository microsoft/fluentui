// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const rushPackages = JSON.parse(fs.readFileSync('rush.json', 'utf8'));

const excludedFolders = [
  path.resolve('common/changes'),
  path.resolve('scripts')
];

/**
 * Tests if the folder path falls under any of the excluded folders.
 */
function isExcluded(folderPath) {
  for (let exclude of excludedFolders) {
    if (folderPath.indexOf(exclude) === 0) {
      return true;
    }
  }

  return false;
}

/**
 * Gets changed packages.
 * @returns null if nothing changed, empty array if everything changed, or specific project names if some changed.
 */
function getChangedPackages(targetBranch) {
  let changedPackages = [];

  let changedFiles = child_process.execSync(`git diff --name-only ${targetBranch}`)
    .toString()
    .trim()
    .split('\n');

  for (let filename of changedFiles) {
    let changedPath = path.dirname(path.resolve(filename));
    console.log(changedPath);

    if (isExcluded(changedPath)) {
      console.log('excluding')
    } else {
      let packageName = getPackageName(changedPath);

      if (!packageName) {
        return [];
      }
      if (changedPackages.indexOf(packageName) < 0) {
        changedPackages.push(packageName);
      }
    }
  }

  return changedPackages.length ? changedPackages : undefined;
}

function cleanPackageDeps() {
  rushPackages.projects.forEach(project => {
    const depFile = path.join(project.projectFolder, 'package-deps.json');

    if (fs.existsSync(depFile)) {
      console.log(`Removing ${depFile}`);
      fs.unlinkSync(depFile);
    }
  });
}

function getPackageName(changedFilePath) {
  if (changedFilePath) {
    console.log(`looking up; ${changedFilePath}`);
    for (let project of rushPackages.projects) {
      let projectPath = path.resolve(project.projectFolder);

      if (changedFilePath.indexOf(projectPath) === 0) {
        console.log(`found ${project.packageName}`);
        return project.packageName;
      }
    }
  }
  console.log(`not found`)
  return undefined;
}

cleanPackageDeps();

const defaultSourceBranch = 'origin/master';
const defaultRushParams = '--vso -p 4 --verbose';
const rushLocation = 'node_modules/@microsoft/rush/bin/rush';

let changedPackages = getChangedPackages(defaultSourceBranch);

if (changedPackages) {
  if (changedPackages.length === 0) {
    /* Build all. */
    console.log('Rebuilding all due to unrecognized updates.');
    child_process.execSync(`node ${rushLocation} rebuild ${defaultRushParams}`, { stdio: [0, 1, 2] });
  } else {
    /* Build specifics. */
    console.log('Building specific packages with detected changes.');
    changedPackages.forEach(packageName => {
      const buildCommand = `node ${rushLocation} build --from ${packageName} --to ${packageName} ${defaultRushParams}`;
      console.log(`Running: ${buildCommand}`);
      child_process.execSync(buildCommand, { stdio: [0, 1, 2] });
    });
  }
} else {
  console.log('No packages have been modified.');
}
