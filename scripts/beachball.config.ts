import { BeachballConfig, ChangelogEntry } from 'beachball';
import GitHubApi from '@octokit/rest';
import { getPullRequestForCommit, fluentRepoDetails } from './github/index';

const repoUrl = `https://github.com/${fluentRepoDetails.owner}/${fluentRepoDetails.repo}`;

if (!process.env.GITHUB_PAT) {
  console.warn('\nGITHUB_PAT environment variable not found. GitHub requests may be rate-limited.\n');
}

const github = new GitHubApi({ ...fluentRepoDetails, token: process.env.GITHUB_PAT });

export const config: BeachballConfig = {
  groups: [
    {
      name: 'Fluent UI React',
      include: ['packages/office-ui-fabric-react', 'packages/react'],
      disallowedChangeTypes: ['major'],
    },
  ],
  changelog: {
    customRenderers: {
      renderHeader: async renderInfo => {
        const {
          newVersionChangelog: { tag, version, date },
          previousJson,
        } = renderInfo;

        // Link to the tag on github
        const header = tag ? `[${version}](${repoUrl}/tree/${tag})` : version;

        // Also include a compare link to the previous tag if available
        const previousTag = previousJson?.entries?.[0]?.tag;
        const compareLink = tag && previousTag ? `[Compare changes](${repoUrl}/compare/${previousTag}..${tag})` : '';

        return `## ${header}\n${date.toUTCString()}\n${compareLink}`.trim();
      },
      renderEntry: async (entry, renderInfo) => {
        // Link to the PR for this changelog entry (or the commit if PR isn't found)
        const prNumber = await _getPrNumber(entry);
        const commitLink = prNumber
          ? `[PR #${prNumber}](${repoUrl}/pulls/${prNumber})`
          : `[commit](${repoUrl}/commit/${entry.commit})`;
        return `- ${entry.comment} (${commitLink} by ${entry.author})`;
      },
    },
  },
};

async function _getPrNumber(entry: ChangelogEntry): Promise<number | undefined> {
  // Look for (presumably) the PR number at the end of the first line of the commit
  const prMatch = entry.comment.split(/\r?\n/)[0].match(/\(#(\d+)\)$/m);
  if (prMatch) {
    return Number(prMatch[1]);
  }

  // Or fetch from GitHub API
  const pr = await getPullRequestForCommit({ commit: entry.commit, github, repoDetails: fluentRepoDetails });
  return pr?.number;
}
