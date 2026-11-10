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

/**
 * Outcome of a registry lookup. A missing version is only meaningful when the lookup itself
 * succeeded, so "package is not published" and "we could not reach the registry" have to stay
 * distinguishable - otherwise a flaky registry silently reports healthy packages as unreleased.
 */
type RegistryLookup = { ok: true; version?: string } | { ok: false; reason: string };

/** Statuses worth retrying: rate limiting and transient server-side failures. */
function isRetriableStatus(status: number | undefined): boolean {
  return status === 408 || status === 429 || (status !== undefined && status >= 500);
}

function requestLatestVersion(name: string): Promise<RegistryLookup> {
  return new Promise(resolve => {
    const url = `https://registry.npmjs.org/${name.replace('/', '%2F')}`;

    const request = https.get(url, { timeout: 20000 }, response => {
      const status = response.statusCode;

      // A 404 is a real answer: the package has never been published.
      if (status === 404) {
        response.resume();
        return resolve({ ok: true, version: undefined });
      }

      if (status !== 200) {
        response.resume();
        return resolve({ ok: false, reason: `registry responded HTTP ${status}` });
      }

      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => (body += chunk));
      response.on('end', () => {
        try {
          resolve({ ok: true, version: JSON.parse(body)['dist-tags']?.latest });
        } catch {
          resolve({ ok: false, reason: 'registry returned a malformed response' });
        }
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({ ok: false, reason: 'registry request timed out' });
    });
    request.on('error', error => resolve({ ok: false, reason: `registry request failed: ${error.message}` }));
  });
}

/**
 * Fetch the `latest` dist-tag straight from the registry (much faster than shelling out to npm).
 *
 * Retries transient failures: this fires one request per public package, so brushing up against
 * rate limiting is realistic, and a diagnostic that quietly downgrades packages on a 429 is worse
 * than useless during an incident.
 */
async function fetchLatestVersion(name: string, attempts = 3): Promise<RegistryLookup> {
  let last: RegistryLookup = { ok: false, reason: 'no attempt was made' };

  for (let attempt = 1; attempt <= attempts; attempt++) {
    last = await requestLatestVersion(name);

    if (last.ok) {
      return last;
    }

    const status = Number(last.reason.match(/HTTP (\d+)/)?.[1]) || undefined;
    const retriable = status === undefined || isRetriableStatus(status);

    if (!retriable || attempt === attempts) {
      return last;
    }

    await new Promise(resolve => {
      setTimeout(resolve, 300 * 2 ** (attempt - 1));
    });
  }

  return last;
}

/** Run `fn` over `items` with bounded concurrency so we don't open 250 sockets at once. */
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  // Never drop below a single worker: a limit of 0 (or a negative one) would spawn no workers at
  // all and resolve instantly with an array of holes, which looks like a clean run.
  const workerCount = Math.max(1, Math.min(Math.floor(limit) || 1, items.length));

  const workers = Array.from({ length: workerCount }, async () => {
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
    const lookup = await fetchLatestVersion(pkg.name);
    const npmVersion = lookup.ok ? lookup.version : undefined;

    const result: PackageStatus = {
      name: pkg.name,
      localVersion: pkg.localVersion,
      npmVersion,
      status: 'in-sync',
    };

    // Only trust "no version" when the registry actually answered. A failed lookup must never be
    // reported as `unpublished`, because unpublished packages are dropped from the recovery set -
    // a transient 429 would otherwise hide a genuine desync.
    if (!lookup.ok) {
      result.status = 'error';
      result.error = lookup.reason;
      return result;
    }

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
  console.log(`  not checked:    ${errored.length}   (registry error or unparseable version)`);
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
    console.log('Could not be checked - re-run before trusting the result above:\n');
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
    if (errored.length) {
      console.log(
        `No version desync detected in the ${statuses.length - errored.length} package(s) that could be\n` +
          `checked, but ${errored.length} could not be compared (see above) - this is NOT a clean bill of health.\n`,
      );
    } else {
      console.log('No version desync detected - the repo and npm are in sync.\n');
    }
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
