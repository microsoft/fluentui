import type { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { IPullRequest, IRepoDetails } from './types';

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
