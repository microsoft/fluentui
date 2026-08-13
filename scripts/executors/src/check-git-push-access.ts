import { spawnSync } from 'child_process';

import { fluentRepoDetails } from '@fluentui/scripts-github';
import { Octokit } from '@octokit/rest';
import yargs from 'yargs';

/**
 * Preflight validation that the configured GitHub PAT can actually push to the release branch.
 *
 * Why this exists:
 * `beachball publish` publishes to npm BEFORE it commits/tags/pushes to git. npm publishes are
 * irreversible, so if the git token turns out to be invalid we end up with npm and the repo
 * permanently out of sync (this happened on 2026-06-30 when an enterprise policy started rejecting
 * classic PATs with a lifetime > 8 days).
 *
 * Running this before the publish step turns that silent, expensive failure into a cheap, loud one.
 */

const adoVariableName = 'gitPushAvailable';

interface PreflightOptions {
  branch: string;
  remote: string;
  allowFailure: boolean;
}

interface PreflightFailure {
  /** Short summary shown in the pipeline error */
  summary: string;
  /** Extra context (API message, git stderr, remediation hints) */
  details?: string[];
}

/**
 * Remove the token from arbitrary text before logging.
 *
 * git usually redacts credentials embedded in remote URLs, but it is not guaranteed for every error
 * path, and we also echo API responses. Since a leaked PAT in build logs is a security incident,
 * scrub defensively rather than trusting upstream behavior.
 */
function redact(text: string, token: string | undefined): string {
  if (!text) {
    return '';
  }
  return token ? text.split(token).join('***') : text;
}

/**
 * Verify the token itself is valid and not expired/revoked/blocked by policy.
 *
 * This is the check that produces a genuinely useful error message: the enterprise policy failure
 * returns a descriptive 403 body, and GitHub also returns the token expiration as a response header.
 */
export async function checkTokenIsUsable(token: string): Promise<PreflightFailure | undefined> {
  const github = new Octokit({ auth: 'token ' + token });

  try {
    const response = await github.users.getAuthenticated();

    const expiration = response.headers['github-authentication-token-expiration'];
    const scopes = response.headers['x-oauth-scopes'];

    console.log(`  authenticated as: ${response.data.login}`);
    console.log(`  token scopes: ${scopes || '(none reported - likely a fine-grained token or GitHub App)'}`);

    if (expiration) {
      const expiresAt = new Date(String(expiration).replace(' UTC', 'Z').replace(' ', 'T'));
      const msLeft = expiresAt.getTime() - Date.now();
      // Expiry is decided on the raw delta, never on whole days: flooring would round a token with
      // 23h of life left down to 0 days and fail a release that would have succeeded. The rounded
      // value is only ever used for humans reading the log.
      const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

      console.log(`  token expires: ${expiration} (~${daysLeft} day(s) from now)`);

      if (msLeft <= 0) {
        return { summary: `The GitHub token expired on ${expiration}.` };
      }
      // Not a failure on its own - the push check below is authoritative - but worth surfacing early
      // so the token gets rotated before it breaks a release.
      if (msLeft <= 3 * 24 * 60 * 60 * 1000) {
        console.warn(
          `  ##vso[task.logissue type=warning]GitHub token expires in ~${daysLeft} day(s) - rotate it soon.`,
        );
      }
    } else {
      console.log('  token expires: (no expiration reported)');
    }
  } catch (err) {
    const error = err as { status?: number; message?: string };
    const status = error.status;

    // 401 = bad/revoked credentials, 403 = valid credentials rejected by policy (the 2026-06-30 case)
    if (status === 401 || status === 403) {
      return {
        summary: `GitHub rejected the token with HTTP ${status}.`,
        details: [
          redact(error.message ?? 'Unknown error', token),
          '',
          'Common causes:',
          '  - the PAT expired or was revoked',
          '  - the PAT violates an org/enterprise policy (e.g. max lifetime for classic PATs)',
          '  - the PAT is missing the "repo" scope',
        ],
      };
    }

    // Network blips and API outages should not be treated as an invalid token, but we also cannot
    // confirm the token is good - defer the verdict to the push check.
    console.warn(`  [WARN] Could not verify the token via the GitHub API: ${redact(String(error.message), token)}`);
    console.warn('  [WARN] Continuing to the git push check, which is authoritative.');
  }

  return undefined;
}

/**
 * Verify we can actually push to the target branch.
 *
 * This is the authoritative check: a token can have perfectly valid credentials yet still lack push
 * permission on the repo. `--dry-run` performs the full negotiation with the server (including the
 * `git-receive-pack` request that returned 403 in the 2026-06-30 incident) without updating any refs.
 */
export function checkCanPush(options: PreflightOptions, token: string | undefined): PreflightFailure | undefined {
  const { remote, branch } = options;
  const args = ['push', '--dry-run', '--no-verify', remote, `HEAD:${branch}`];

  console.log(`  running: git ${args.join(' ')}`);

  const result = spawnSync('git', args, { encoding: 'utf8' });

  if (result.error) {
    return {
      summary: `Failed to run git push --dry-run: ${result.error.message}`,
    };
  }

  if (result.status !== 0) {
    const stderr = redact(result.stderr || '', token).trim();
    const stdout = redact(result.stdout || '', token).trim();
    const combined = `${stderr}\n${stdout}`;

    // A non-fast-forward rejection means the push was REFUSED BY REF STATE, not by auth - we
    // successfully authenticated and got far enough to compare refs. This happens whenever a commit
    // lands on the target branch between checkout and preflight. Failing here would block perfectly
    // good releases, and beachball already handles staleness itself (it fetches + merges inside its
    // retry loop before pushing).
    const isStaleRefRejection = /non-fast-forward|fetch first|Updates were rejected because/i.test(combined);

    if (isStaleRefRejection) {
      console.warn(
        [
          `  [WARN] ${remote}/${branch} has moved ahead of the current checkout.`,
          '  [WARN] Authentication succeeded, so this is NOT a token problem and the release may proceed.',
          '  [WARN] beachball fetches and merges the latest changes before pushing.',
        ].join('\n'),
      );
      return undefined;
    }

    return {
      summary: `git push --dry-run to ${remote}/${branch} failed (exit code ${result.status}).`,
      details: [stderr, stdout].filter(Boolean),
    };
  }

  console.log(`  push access to ${remote}/${branch} confirmed`);

  return undefined;
}

/** Tell ADO whether the later publish step may push, so it can pick the right beachball flags. */
function setPipelineVariable(value: boolean): void {
  console.log(`##vso[task.setvariable variable=${adoVariableName};]${value}`);
}

async function runPreflight(options: PreflightOptions): Promise<void> {
  const token = process.env.GITHUB_PAT;

  console.log('Validating git push access before publishing...\n');
  console.log(`  repo: ${fluentRepoDetails.owner}/${fluentRepoDetails.repo}`);
  console.log(`  target: ${options.remote}/${options.branch}\n`);

  let failure: PreflightFailure | undefined;

  if (!token) {
    failure = {
      summary: 'GITHUB_PAT environment variable is not set.',
      details: ['The release pipeline must provide GITHUB_PAT for the publish step to push bumps and tags.'],
    };
  } else {
    failure = await checkTokenIsUsable(token);
  }

  if (!failure) {
    failure = checkCanPush(options, token);
  }

  if (!failure) {
    console.log('\nPreflight passed - the release may publish and push normally.\n');
    setPipelineVariable(true);
    return;
  }

  setPipelineVariable(false);

  const message = [
    '',
    'Git push preflight FAILED.',
    '',
    failure.summary,
    ...(failure.details?.length ? ['', ...failure.details] : []),
    '',
  ].join('\n');

  if (options.allowFailure) {
    // Force mode: the operator has explicitly accepted an npm-only release.
    console.warn(message);
    console.warn(
      [
        'Continuing because the release was forced (forceReleaseWithoutGitPush=true).',
        'Packages will be published to npm, but version bumps, changelogs and tags will NOT be pushed.',
        'Run the "release-recovery" skill against this pipeline run afterwards to resync the repo.',
        '',
      ].join('\n'),
    );
    return;
  }

  console.error(message);
  console.error(
    [
      'Nothing has been published - the repo and npm are still in sync.',
      '',
      'To fix: rotate the GitHub PAT used by this pipeline (variable group "Github and NPM secrets").',
      'To release anyway (npm only, manual repo update afterwards): re-run with',
      'the "Force release without git push" parameter enabled.',
      '',
    ].join('\n'),
  );

  process.exit(1);
}

export { redact };

// Only parse argv and run when invoked as a CLI - importing this module (from tests, or to reuse
// the classification logic) must not execute a preflight or call process.exit.
if (require.main === module) {
  const argv = yargs
    .option('branch', {
      type: 'string',
      describe: 'Branch the release will push to',
      default: 'master',
    })
    .option('remote', {
      type: 'string',
      describe: 'Git remote the release will push to',
      default: 'origin',
    })
    .option('allow-failure', {
      type: 'boolean',
      describe: 'Report the result but do not fail the step (used by force mode)',
      default: false,
    })
    .strict().argv;

  runPreflight({
    branch: argv.branch,
    remote: argv.remote,
    allowFailure: argv['allow-failure'],
  }).catch(err => {
    console.error('Unexpected error during git push preflight:', err);
    process.exit(1);
  });
}
