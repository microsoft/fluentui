import { spawnSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import { findGitRoot } from '../monorepo/index';

const generateOnly = process.argv.includes('-g');
const beachballBin = require.resolve('beachball/bin/beachball.js');
const bumpCmd = [process.execPath, beachballBin, 'bump'];
const gitRoot = findGitRoot();

function run(args: string[]) {
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
export function generateVersionFiles() {
  const gitRoot = findGitRoot();

  if (!generateOnly) {
    console.log('bumping');
    // Do a dry-run on all packages
    run(bumpCmd);
  }

  // 2. gather version info
  const updatedVersionContents: Record<string, string> = {};
  const packageJsons = glob.sync('+(packages|apps)/*/package.json', { cwd: gitRoot });
  packageJsons.forEach(packageJsonPath => {
    const versionFile = path.join(gitRoot, path.dirname(packageJsonPath), 'src/version.ts');
    const packageJson = fs.readJSONSync(path.join(gitRoot, packageJsonPath));
    const dependencies = packageJson.dependencies || {};

    if (
      !fs.existsSync(path.dirname(versionFile)) ||
      packageJsonPath.includes('set-version') ||
      !dependencies['@fluentui/set-version']
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
import { setVersion } from '@fluentui/set-version';
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
}
