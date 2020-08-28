// @ts-check

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const generateOnly = process.argv.includes('-g');
const beachballBin = require.resolve('beachball/bin/beachball.js');
const bumpCmd = [process.execPath, beachballBin, 'bump'];
const findGitRoot = require('../monorepo/findGitRoot');
const gitRoot = findGitRoot();

function run(args) {
  const [cmd, ...restArgs] = args;
  const runResult = spawnSync(cmd, restArgs, { cwd: gitRoot });
  if (runResult.status === 0) {
    return runResult.stdout.toString().trim();
  }

  return null;
}

function revertLocalChanges() {
  const stash = `tmp_bump_${new Date().getTime()}`;
  run(['git', 'stash', 'push', '-u', '-m', stash]);
  const results = run(['git', 'stash', 'list']);
  if (results) {
    const lines = results.split(/\n/);
    const foundLine = lines.find(line => line.includes(stash));

    if (foundLine) {
      const matched = foundLine.match(/^[^:]+/);
      if (matched) {
        run(['git', 'stash', 'drop', matched[0]]);
        return true;
      }
    }
  }

  return false;
}

/**
 * Generates version files by bumping
 *
 * 1. bumps the versions with `beachball bump`
 * 2. gather version info
 * 3. revert all local changes
 * 4. write out the version files
 *
 * "generateOnly" mode takes existing versions and write them out to version files (do this when out of sync)
 */
module.exports = function generateVersionFiles() {
  const gitRoot = findGitRoot();

  if (!generateOnly) {
    console.log('bumping');
    // Do a dry-run on all packages
    run(bumpCmd);
  }

  // 2. gather version info
  const updatedVersionContents = {};
  const packageJsons = glob.sync('+(packages|apps)/*/package.json', { cwd: gitRoot });
  packageJsons.forEach(packageJsonPath => {
    const versionFile = path.join(gitRoot, path.dirname(packageJsonPath), 'src/version.ts');
    const packageJson = fs.readJSONSync(path.join(gitRoot, packageJsonPath));
    const dependencies = packageJson.dependencies || {};

    if (
      !fs.existsSync(path.dirname(versionFile)) ||
      packageJsonPath.includes('set-version') ||
      !dependencies['@uifabric/set-version']
    ) {
      return;
    }

    let shouldGenerate = true;
    const setCurrentVersion = `setVersion('${packageJson.name}', '${packageJson.version}');`;
    if (fs.existsSync(versionFile) && process.argv.includes('-f')) {
      const originVersionFileContent = fs.readFileSync(versionFile).toString();
      shouldGenerate = !originVersionFileContent.includes(setCurrentVersion);
    }

    if (shouldGenerate) {
      updatedVersionContents[versionFile] = `// Do not modify this file; it is generated as part of publish.
// The checked in version is a placeholder only and will not be updated.
import { setVersion } from '@uifabric/set-version';
${setCurrentVersion}`;
    }
  });

  // 3. revert bump changes
  if (!generateOnly) {
    console.log('reverting');
    revertLocalChanges();
  }

  // 4. write version files
  if (updatedVersionContents) {
    Object.keys(updatedVersionContents).forEach(versionFile => {
      console.log(`writing to ${versionFile}`);
      fs.writeFileSync(versionFile, updatedVersionContents[versionFile]);
    });
  }
};
