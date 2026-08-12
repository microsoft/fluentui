import { spawnSync } from 'child_process';
import https from 'https';

import { getAllPackageInfo } from '@fluentui/scripts-monorepo';
import * as semver from 'semver';
import yargs from 'yargs';

/**
 * Read-only diagnosis of drift between the local repo and the npm registry.
 *
 * Used by the `release-recovery` skill to work out what a failed release left behind.
 *
 * The failure mode that matters is `npm-ahead`: the package was published but the version bump never
 * reached the repo. That is the "publish succeeded, git push failed" desync, and it is what recovery
 * repairs.
 *
 * Missing release tags can also be reported via `--check-tags`, but they are informational only.
 * Recovery deliberately does NOT recreate them: a recovery commit is not the commit the release was
 * actually built from, so tags created against it would point at the wrong history. A single v9
 * release also spans ~90 packages, which makes bulk tag creation both noisy and hard to review.
 *
 * Nothing here mutates the repo, the registry, or git.
 */

type SyncStatus = 'in-sync' | 'npm-ahead' | 'repo-ahead' | 'unpublished' | 'error';

interface PackageStatus {
  name: string;
  localVersion: string;
  npmVersion?: string;
  status: SyncStatus;
  /** Expected git tag for the currently published version */
  tag?: string;
  tagExists?: boolean;
  error?: string;
}

/** Fetch the `latest` dist-tag straight from the registry (much faster than shelling out to npm). */
function fetchLatestVersion(name: string): Promise<string | undefined> {
  return new Promise(resolve => {
    const url = `https://registry.npmjs.org/${name.replace('/', '%2F')}`;

    const request = https.get(url, { timeout: 20000 }, response => {
      if (response.statusCode === 404) {
        response.resume();
        return resolve(undefined);
      }

      if (response.statusCode !== 200) {
        response.resume();
        return resolve(undefined);
      }

      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => (body += chunk));
      response.on('end', () => {
        try {
          resolve(JSON.parse(body)['dist-tags']?.latest);
        } catch {
          resolve(undefined);
        }
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve(undefined);
    });
    request.on('error', () => resolve(undefined));
  });
}

/** Run `fn` over `items` with bounded concurrency so we don't open 250 sockets at once. */
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  });

  await Promise.all(workers);

  return results;
}

/** All tags on the remote, fetched in a single call. */
function getRemoteTags(remote: string): Set<string> | undefined {
  const result = spawnSync('git', ['ls-remote', '--tags', remote], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

  if (result.status !== 0) {
    return undefined;
  }

  const tags = new Set<string>();
  for (const line of (result.stdout || '').split('\n')) {
    const match = line.match(/refs\/tags\/(.+?)(\^\{\})?$/);
    if (match) {
      tags.add(match[1]);
    }
  }

  return tags;
}

interface Options {
  remote: string;
  json: boolean;
  concurrency: number;
  ref?: string;
  checkTags: boolean;
}

/**
 * Read package versions either from the working tree or, when `ref` is given, from a git ref.
 *
 * Reading from a ref matters: running the diagnosis on a stale checkout makes every package that
 * has been released since look like a desync. Pointing at `upstream/master` removes that trap.
 */
function getLocalVersions(ref: string | undefined): Array<{ name: string; localVersion: string }> {
  const allPackages = getAllPackageInfo();

  const publicPackages = Object.values(allPackages)
    .filter(info => !info.packageJson.private)
    .sort((a, b) => a.packageJson.name.localeCompare(b.packageJson.name));

  if (!ref) {
    return publicPackages.map(info => ({ name: info.packageJson.name, localVersion: info.packageJson.version }));
  }

  return publicPackages.flatMap(info => {
    const gitPath = `${info.packagePath.replace(/\\/g, '/')}/package.json`;
    const result = spawnSync('git', ['show', `${ref}:${gitPath}`], { encoding: 'utf8' });

    if (result.status !== 0) {
      // Package does not exist on that ref yet - not a desync, just newer than the ref.
      return [];
    }

    try {
      return [{ name: info.packageJson.name, localVersion: JSON.parse(result.stdout).version }];
    } catch {
      return [];
    }
  });
}

async function main(options: Options): Promise<void> {
  const publicPackages = getLocalVersions(options.ref);

  if (!options.json) {
    const source = options.ref ? `git ref "${options.ref}"` : 'the working tree';
    console.log(`Checking ${publicPackages.length} public package(s) from ${source} against the npm registry...\n`);
  }

  const remoteTags = options.checkTags ? getRemoteTags(options.remote) : undefined;
  if (options.checkTags && !remoteTags && !options.json) {
    console.warn(`[WARN] Could not list tags on "${options.remote}" - tag checks will be skipped.\n`);
  }

  const statuses = await mapWithConcurrency(publicPackages, options.concurrency, async pkg => {
    const npmVersion = await fetchLatestVersion(pkg.name);

    const result: PackageStatus = {
      name: pkg.name,
      localVersion: pkg.localVersion,
      npmVersion,
      status: 'in-sync',
    };

    if (!npmVersion) {
      result.status = 'unpublished';
      return result;
    }

    if (npmVersion === pkg.localVersion) {
      result.status = 'in-sync';
    } else if (semver.valid(npmVersion) && semver.valid(pkg.localVersion)) {
      // Direction matters. `npm-ahead` means the registry has a version the repo never recorded,
      // which is the desync a failed release leaves behind. `repo-ahead` is normal and benign -
      // it just means the registry's `latest` dist-tag lags the repo (for example a package whose
      // most recent publishes were prereleases).
      result.status = semver.gt(npmVersion, pkg.localVersion) ? 'npm-ahead' : 'repo-ahead';
    } else {
      result.status = 'error';
      result.error = `Could not compare versions (repo="${pkg.localVersion}", npm="${npmVersion}")`;
    }

    // Tag check always uses the PUBLISHED version - that is the one a release should have tagged.
    const tag = `${pkg.name}_v${npmVersion}`;
    result.tag = tag;
    result.tagExists = remoteTags ? remoteTags.has(tag) : undefined;

    return result;
  });

  const npmAhead = statuses.filter(s => s.status === 'npm-ahead');
  const repoAhead = statuses.filter(s => s.status === 'repo-ahead');
  const errored = statuses.filter(s => s.status === 'error');
  const missingTags = statuses.filter(s => s.status !== 'unpublished' && s.tagExists === false);

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          remote: options.remote,
          totals: {
            checked: statuses.length,
            inSync: statuses.filter(s => s.status === 'in-sync').length,
            npmAhead: npmAhead.length,
            repoAhead: repoAhead.length,
            unpublished: statuses.filter(s => s.status === 'unpublished').length,
            errored: errored.length,
            ...(options.checkTags && { missingTags: missingTags.length }),
          },
          npmAhead,
          repoAhead,
          errored,
          // Informational only - recovery does not recreate tags.
          ...(options.checkTags && { missingTags }),
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(`Checked: ${statuses.length}`);
  console.log(`  in sync:        ${statuses.filter(s => s.status === 'in-sync').length}`);
  console.log(`  npm ahead:      ${npmAhead.length}   <- needs recovery`);
  console.log(`  repo ahead:     ${repoAhead.length}   (normal: unreleased work or prerelease dist-tag)`);
  console.log(`  never released: ${statuses.filter(s => s.status === 'unpublished').length}`);
  console.log(`  uncomparable:   ${errored.length}`);
  if (options.checkTags) {
    console.log(`  missing tags:   ${remoteTags ? missingTags.length : 'n/a'}   (informational only)`);
  }
  console.log();

  if (npmAhead.length) {
    console.log('Published to npm but NOT reflected in the repo (version desync):\n');
    console.log('  package'.padEnd(52) + 'repo'.padEnd(20) + 'npm');
    for (const pkg of npmAhead) {
      console.log(`  ${pkg.name.padEnd(50)}${pkg.localVersion.padEnd(20)}${pkg.npmVersion}`);
    }
    console.log();
  }

  if (errored.length) {
    console.log('Could not compare (inspect manually):\n');
    for (const pkg of errored) {
      console.log(`  ${pkg.name}: ${pkg.error}`);
    }
    console.log();
  }

  if (options.checkTags && missingTags.length) {
    console.log('Published versions with no git tag on the remote (informational - not recovered):\n');
    for (const pkg of missingTags) {
      console.log(`  ${pkg.tag}`);
    }
    console.log(
      '\n  Release tags are not recreated during recovery: a recovery commit is not the commit\n' +
        '  the release was built from, so tags against it would point at the wrong history.\n',
    );
  }

  if (!npmAhead.length) {
    console.log('No version desync detected - the repo and npm are in sync.\n');
  }
}

const argv = yargs
  .option('remote', {
    type: 'string',
    describe: 'Git remote to check tags against',
    default: 'origin',
  })
  .option('json', {
    type: 'boolean',
    describe: 'Emit machine-readable JSON instead of a table',
    default: false,
  })
  .option('concurrency', {
    type: 'number',
    describe: 'Maximum parallel registry requests',
    default: 12,
  })
  .option('ref', {
    type: 'string',
    describe:
      'Read package versions from this git ref instead of the working tree. Use the up-to-date ' +
      'release branch (e.g. upstream/master) to avoid false positives from a stale checkout.',
  })
  .option('check-tags', {
    type: 'boolean',
    describe:
      'Also report published versions that have no git tag on the remote. Informational only - ' +
      'recovery does not recreate tags. Adds a slow ls-remote over tens of thousands of refs.',
    default: false,
  })
  .strict().argv;

main({
  remote: argv.remote,
  json: argv.json,
  concurrency: argv.concurrency,
  ref: argv.ref,
  checkTags: argv['check-tags'],
}).catch(err => {
  console.error('Failed to check release sync state:', err);
  process.exit(1);
});
