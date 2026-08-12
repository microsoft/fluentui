import type { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import type { IPullRequest, IRepoDetails } from './types';

/**
 * Once GitHub rejects our credentials, every subsequent request will be rejected too. Tracking this
 * lets callers short-circuit instead of retrying for every changelog entry.
 *
 * Context: during the 2026-06-30 release an expired PAT produced ~180 near-identical 403 stack
 * traces, which buried the single line that actually mattered (the failed git push).
 */
let authFailureLogged = false;

/** True if a previous GitHub API call failed with an authentication/authorization error. */
export function hasGitHubAuthFailed(): boolean {
  return authFailureLogged;
}

/** Reset the cached auth-failure state (intended for tests). */
export function resetGitHubAuthFailure(): void {
  authFailureLogged = false;
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

  // Skip the request entirely if we already know the credentials are rejected. Without this, a bad
  // token causes one failed request (plus a full stack trace) for every single changelog entry.
  if (authFailureLogged) {
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

    // 401/403 means the token is bad, expired, or blocked by policy - retrying for every remaining
    // commit is pure noise. Log once with the actionable detail, then degrade gracefully: changelog
    // entries fall back to commit links instead of PR links.
    if (status === 401 || status === 403) {
      authFailureLogged = true;
      const message = (ex as { message?: string }).message ?? 'Unknown error';
      console.warn(
        [
          '',
          `##vso[task.logissue type=warning]GitHub API authentication failed (HTTP ${status}) while building changelogs.`,
          `  ${message}`,
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
