import { spawnSync } from 'child_process';
import * as path from 'path';

import { findGitRoot } from '@fluentui/scripts-monorepo';
import { stripIndents } from '@nx/devkit';
import * as fs from 'fs-extra';
import * as glob from 'glob';

const isExecutedFromCli = require.main === module;

if (isExecutedFromCli) {
  const argv = process.argv.slice(2);
  const beachballBin = require.resolve('beachball/bin/beachball.js');
  const bumpCmd = [process.execPath, beachballBin, 'bump'];
  const gitRoot = findGitRoot();

  main({ argv, bumpCmd, gitRoot });
}

function main(options: { argv: string[]; bumpCmd: string[]; gitRoot: string }) {
  const { argv, gitRoot, bumpCmd } = options;
  const args = { generateOnly: argv.includes('-g'), forceUpdate: argv.includes('-f') };
  generateVersionFiles({ args, gitRoot, bumpCmd });
}

function run(args: string[], cwd: string) {
  const [cmd, ...restArgs] = args;
  const runResult = spawnSync(cmd, restArgs, { cwd });
  if (runResult.status === 0) {
    return runResult.stdout.toString().trim();
  }

  return null;
}

function revertLocalChanges(cwd: string) {
  const stash = `tmp_bump_${new Date().getTime()}`;
  run(['git', 'stash', 'push', '-u', '-m', stash], cwd);
  const results = run(['git', 'stash', 'list'], cwd);
  if (results) {
    const lines = results.split(/\n/);
    const foundLine = lines.find(line => line.includes(stash));

    if (foundLine) {
      const matched = foundLine.match(/^[^:]+/);
      if (matched) {
        run(['git', 'stash', 'drop', matched[0]], cwd);
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
export function generateVersionFiles(options: {
  args: {
    /**
     * "generateOnly" mode takes existing versions and write them out to version files (do this when out of sync)
     */
    generateOnly?: boolean;
    /**
     * TODO: ??? if version.ts placeholder is identical to package version don't update it
     */
    forceUpdate?: boolean;
  };
  gitRoot: string;
  bumpCmd: string[];
}) {
  const { args, gitRoot, bumpCmd } = options;

  if (!args.generateOnly) {
    console.log('bumping');
    // Do a dry-run on all packages
    run(bumpCmd, gitRoot);
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

    if (fs.existsSync(versionFile) && args.forceUpdate) {
      const originVersionFileContent = fs.readFileSync(versionFile).toString();
      shouldGenerate = !originVersionFileContent.includes(setCurrentVersion);
    }

    if (shouldGenerate) {
      updatedVersionContents[versionFile] = stripIndents`
      // Do not modify this file; it is generated as part of publish.
      // The checked in version is a placeholder only and will not be updated.
      import { setVersion } from '@fluentui/set-version';
      ${setCurrentVersion}
      `;
    }
  });

  // 3. revert bump changes
  if (!args.generateOnly) {
    console.log('reverting');
    revertLocalChanges(gitRoot);
  }

  // 4. write version files
  if (updatedVersionContents) {
    Object.keys(updatedVersionContents).forEach(versionFile => {
      console.log(`writing to ${versionFile}`);
      fs.writeFileSync(versionFile, updatedVersionContents[versionFile]);
    });
  }
}
