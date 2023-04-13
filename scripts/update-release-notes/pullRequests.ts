import type { RestEndpointMethodTypes } from '@octokit/rest';
import { ChangelogEntry } from 'beachball';
import { IPullRequest, processPullRequestApiResponse, getPullRequestForCommit } from '@fluentui/scripts-github';
import { repoDetails, github } from './init';
import { IExtendedPullRequest } from './types';

/**
 * Get the single pull request associated with the given changelog entry.
 */
export async function getPullRequest(entry: ChangelogEntry): Promise<IPullRequest | undefined> {
  const { commit, author: authorEmail } = entry;

  const pr = await getPullRequestForCommit({
    commit,
    github,
    repoDetails,
    authorEmail,
    verbose: true,
  });
  if (pr) {
    return pr;
  }

  // Backup approach: check recent PRs for a commit with a matching message and author
  // (the commit referenced in the change file might not directly exist in a PR if the PR was rebased)
  console.log(`Could not find a PR matching ${commit}.`);
  console.log(`Checking for a commit with a matching message recent PRs by ${authorEmail} instead...`);
  return getMatchingRecentPullRequest(entry);
}

/**
 * Look for a commit with a matching message and author among the recent PRs.
 */
async function getMatchingRecentPullRequest(entry: ChangelogEntry): Promise<IPullRequest | undefined> {
  const { author: authorEmail, commit: commitHash } = entry;
  let possiblePrs: IPullRequest[] = [];
  let message: string | undefined;
  let author: string | undefined;
  try {
    // Get info about the commit to find the message and author (GH username) to match
    // (need to get the GH username since it's not possible to search by email)
    const commitResponse = await github.repos.getCommit({ ref: commitHash!, ...repoDetails });
    if (commitResponse.data.author) {
      author = commitResponse.data.author.login;
      message = commitResponse.data.commit.message;
    } else {
      console.warn(`No author data available for ${commitHash}`);
    }
  } catch (ex) {
    console.warn(`Error getting commit ${commitHash}: ${ex}`);
  }

  try {
    if (author) {
      // Get this author's recent PRs and look for one or more with a matching commit message and email
      possiblePrs = (await getRecentPrsByAuthor(author, authorEmail)).filter(pr =>
        (pr.commits ?? []).some(commit => commit.message === message && commit.authorEmail === authorEmail),
      );
    }
  } catch (ex) {
    console.warn(`Error getting recent PRs by ${author}: ${ex}`);
  }

  const commitDescription = `message "${message}" by ${authorEmail} (from ${commitHash})`;
  if (possiblePrs.length === 1) {
    console.log(`Found PR #${possiblePrs[0].number} containing a commit with ${commitDescription}\n`);
    return possiblePrs[0];
  } else if (possiblePrs.length > 1) {
    // This is an iffy way of finding the matching PR anyway, so if multiple PRs match, don't use any
    console.warn(`Multiple PRs found containing a commit with ${commitDescription}:`);
    console.warn(possiblePrs.map(pr => `  ${pr.url}`).join('\n'));
    console.warn('Not using any of them to avoid showing incorrect data.\n');
  } else {
    console.warn(`No PRs found for ${commitHash} (changelog message: "${entry.comment}")\n`);
  }
}

const _recentPrsByAuthor: { [author: string]: IExtendedPullRequest[] } = {};

/**
 * Get the most recently updated merged PRs from the given author.
 * @param authorUsername - Author username (not email)
 * @param authorEmail - Author email
 * @param count - Number of PRs to fetch, default 10
 */
async function getRecentPrsByAuthor(
  authorUsername: string,
  authorEmail: string,
  count: number = 10,
): Promise<IExtendedPullRequest[]> {
  if (!_recentPrsByAuthor[authorUsername]) {
    try {
      // Get the author's 10 most recently updated merged PRs
      console.log(`Getting ${count} most recent PRs by ${authorUsername}...`);
      // (this is not quite the right type, since merge_commit_sha doesn't exist on the real response)
      const result = (
        await github.search.issuesAndPullRequests({
          q: [
            'type:pr',
            'is:merged',
            'author:' + authorUsername,
            'user:' + repoDetails.owner,
            'repo:' + repoDetails.repo,
          ].join('+'),
          sort: 'updated',
          order: 'desc',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          per_page: count,
        })
      ).data.items;

      // Add commit info
      const prs = await _addCommitInfo(result.map(pr => processPullRequestApiResponse(pr, authorEmail)));

      _recentPrsByAuthor[authorUsername] = prs;
    } catch (ex) {
      console.warn(`Error getting recent PRs by ${authorUsername}: ${ex}`);
      _recentPrsByAuthor[authorUsername] = [];
    }
  }
  return _recentPrsByAuthor[authorUsername];
}

/**
 * For each pull request, fetch its list of commits and add it to the object.
 * @param prs - PRs to augment
 */
async function _addCommitInfo(prs: IPullRequest[]): Promise<IExtendedPullRequest[]> {
  const results: IExtendedPullRequest[] = [];
  for (const pr of prs) {
    console.log(`  Getting commits for #${pr.number}...`);
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const commits = await github.pulls.listCommits({ pull_number: pr.number, ...repoDetails });

      results.push({
        ...pr,
        commits: dataWithAuthor(commits.data).map(commit => ({
          commit: commit.sha,
          message: commit.commit.message,
          author: commit.author.login,
          authorEmail: commit.commit.author?.email,
        })),
      });
    } catch (ex) {
      // ignore
    }
  }
  return results;

  function dataWithAuthor(value: RestEndpointMethodTypes['pulls']['listCommits']['response']['data']) {
    type Commit = (typeof value)[number];
    type FilteredCommit = Omit<Commit, 'author'> & { author: NonNullable<Commit['author']> };
    return value.filter(commit => Boolean(commit.author)) as FilteredCommit[];
  }
}
