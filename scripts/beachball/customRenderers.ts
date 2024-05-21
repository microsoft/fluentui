import { spawnSync } from 'child_process';

import { fluentRepoDetails, getPullRequestForCommit } from '@fluentui/scripts-github';
import { Octokit } from '@octokit/rest';
import { ChangelogEntry, PackageChangelogRenderInfo } from 'beachball';

const githubPAT = process.env.GITHUB_PAT;
if (!githubPAT && (process.argv.includes('bump') || process.argv.includes('publish'))) {
  console.warn('\nGITHUB_PAT environment variable not found. GitHub requests may be rate-limited.\n');
}

const github = new Octokit({
  ...fluentRepoDetails,
  ...(githubPAT && { auth: 'token ' + githubPAT }),
});

const repoUrl = `https://github.com/${fluentRepoDetails.owner}/${fluentRepoDetails.repo}`;

export async function renderHeader(renderInfo: PackageChangelogRenderInfo): Promise<string> {
  const {
    newVersionChangelog: { tag, version, date },
    previousJson,
  } = renderInfo;

  // Link to the tag on github
  const header = tag ? `[${version}](${repoUrl}/tree/${tag})` : version;

  // Also include a compare link to the previous tag if available
  const previousTag = previousJson?.entries?.[0]?.tag;
  const compareLink = tag && previousTag ? ` \n[Compare changes](${repoUrl}/compare/${previousTag}..${tag})` : '';

  return `## ${header}\n\n${date.toUTCString()}${compareLink}`;
}

export async function renderEntry(entry: ChangelogEntry): Promise<string> {
  // Link to the PR for this changelog entry (or the commit if PR isn't found)
  const prNumber = await _getPrNumber(entry);
  const commitLink = prNumber
    ? `[PR #${prNumber}](${repoUrl}/pull/${prNumber})`
    : `[commit](${repoUrl}/commit/${entry.commit})`;
  return `- ${entry.comment} (${commitLink} by ${entry.author})`;
}

async function _getPrNumber(entry: ChangelogEntry): Promise<number | undefined> {
  // Look for (presumably) the PR number at the end of the first line of the commit
  try {
    // Get the actual commit message which should contain the PR number
    const logResult = spawnSync('git', ['log', '--pretty=format:%s', '-n', '1', entry.commit]);
    if (logResult.status === 0) {
      const message = logResult.stdout.toString().trim();
      const prMatch = message.split(/\r?\n/)[0].match(/\(#(\d+)\)$/m);
      if (prMatch) {
        return Number(prMatch[1]);
      }
    }
  } catch (ex) {
    console.log(`Could not get commit message for ${entry.commit} to find PR number (trying another method):`, ex);
  }

  // Or fetch from GitHub API
  console.log(`Attempting to fetch pull request corresponding to ${entry.commit}...`);
  const pr = await getPullRequestForCommit({ commit: entry.commit, github, repoDetails: fluentRepoDetails });
  if (pr) {
    console.log('...success!'); // failure message is logged by getPullRequestForCommit
    return pr.number;
  }
}
