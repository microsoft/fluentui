import type { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import type { IPullRequest, IRepoDetails } from './types';

/**
 * Why further PR lookups are being skipped, if they are.
 *
 * Once GitHub rejects our credentials every subsequent request will be rejected too, and once we
 * are rate limited the remaining lookups will only make it worse - in both cases the useful move is
 * to stop asking. The reason is kept because the two need very different advice.
 *
 * Context: during the 2026-06-30 release an expired PAT produced ~180 near-identical 403 stack
 * traces, which buried the single line that actually mattered (the failed git push).
 */
let lookupsDisabledReason: 'auth' | 'rate-limit' | undefined;

/** True if a previous GitHub API call failed with an authentication/authorization error. */
export function hasGitHubAuthFailed(): boolean {
  return lookupsDisabledReason === 'auth';
}

/** Reset the cached failure state (intended for tests). */
export function resetGitHubAuthFailure(): void {
  lookupsDisabledReason = undefined;
}

/**
 * Separate a genuine credential problem from rate limiting.
 *
 * GitHub overloads 403: it means "forbidden" for a bad or policy-blocked token, but also for
 * primary and secondary rate limits. Telling someone to rotate a perfectly good PAT in the middle
 * of a release is exactly the kind of misdirection this logging is meant to prevent, so the two are
 * told apart by the rate-limit headers GitHub sends.
 */
function classifyFailure(ex: unknown): 'auth' | 'rate-limit' | undefined {
  const status = (ex as { status?: number }).status;

  if (status === 429) {
    return 'rate-limit';
  }

  if (status !== 401 && status !== 403) {
    return undefined;
  }

  const headers = ((ex as { response?: { headers?: Record<string, unknown> } }).response?.headers ?? {}) as Record<
    string,
    unknown
  >;

  if (headers['retry-after'] !== undefined || String(headers['x-ratelimit-remaining']) === '0') {
    return 'rate-limit';
  }

  return 'auth';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IGetPullRequestFromCommitParams {
  github: Octokit;
  repoDetails: IRepoDetails;
  /** Commit hash */
  commit: string;
  /** Provide this to have it included in the resulting IPullRequest */
  authorEmail?: string;
  verbose?: boolean;
}

/**
 * Get the pull request info corresponding to the given commit.
 * (The `author.email` property is only present if `authorEmail` is provided.)
 */
export async function getPullRequestForCommit(
  params: IGetPullRequestFromCommitParams,
): Promise<IPullRequest | undefined> {
  const { github, repoDetails, commit, authorEmail, verbose } = params;

  // Skip the request entirely if we already know it cannot succeed. Without this, a bad token
  // causes one failed request (plus a full stack trace) for every single changelog entry.
  if (lookupsDisabledReason) {
    return;
  }

  verbose && console.log(`Looking for the PR containing ${commit}...`);

  try {
    // Attempt to directly find the PR corresponding to the commit from the change file
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const result = await github.repos.listPullRequestsAssociatedWithCommit({ commit_sha: commit, ...repoDetails });

    // Filter out unmerged PRs, in case the commit has been in multiple PRs but only one got merged
    // (check merged_at because that's only set if the PR has been merged, whereas merge_commit_sha
    // is set even for un-merged PRs, to the most recent intermediate merge)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const prs = result.data.filter(result => !!result.merged_at);
    if (prs.length > 1) {
      // In case the commit was in PRs to multiple branches or something?
      console.warn(`Multiple PRs found for ${commit}:`);
      console.warn(prs.map(pr => `  ${pr.url}`).join('\n'));
    }

    if (prs[0]) {
      verbose && console.log(`Found matching PR #${prs[0].number}.\n`);
      return processPullRequestApiResponse(prs[0], authorEmail);
    }
  } catch (ex) {
    const status = (ex as { status?: number }).status;
    const reason = classifyFailure(ex);

    // A rejected token or a rate limit means retrying for every remaining commit is pure noise.
    // Log once with the actionable detail, then degrade gracefully: changelog entries fall back to
    // commit links instead of PR links.
    if (reason) {
      lookupsDisabledReason = reason;
      const message = (ex as { message?: string }).message ?? 'Unknown error';
      const headline =
        reason === 'auth'
          ? `GitHub API authentication failed (HTTP ${status}) while building changelogs.`
          : `GitHub API rate limit reached (HTTP ${status}) while building changelogs.`;
      const advice =
        reason === 'auth'
          ? '  Check that the pipeline token is valid and has not expired.'
          : '  This is a rate limit, not a token problem - the token does not need rotating.';

      console.warn(
        [
          '',
          `##vso[task.logissue type=warning]${headline}`,
          `  ${message}`,
          advice,
          '  Changelog entries will link to commits instead of pull requests.',
          '  Further PR lookups are skipped for this run.',
          '',
        ].join('\n'),
      );
      return;
    }

    console.warn(`Error finding PR for ${commit}`, ex);
    return;
  }

  console.warn(`Could not find a PR matching ${commit}.`);
}

/**
 * Convert a GitHub API response to an IPullRequest.
 * The `author.email` property is only present if `authorEmail` is provided.
 */
export function processPullRequestApiResponse(
  pr:
    | RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items'][number]
    | RestEndpointMethodTypes['repos']['listPullRequestsAssociatedWithCommit']['response']['data'][number],
  authorEmail?: string,
): IPullRequest {
  const user = pr.user as NonNullable<(typeof pr)['user']>;
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    number: pr.number,
    url: pr.html_url,
    author: {
      email: authorEmail,
      username: user.login,
      url: user.html_url,
    },
  };
}
