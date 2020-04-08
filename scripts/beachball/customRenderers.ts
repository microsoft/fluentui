import { spawnSync } from 'child_process';
import GitHubApi from '@octokit/rest';
import { PackageChangelogRenderInfo, ChangelogEntry } from 'beachball';
import { getPullRequestForCommit, fluentRepoDetails } from '../github';

if (!process.env.GITHUB_PAT) {
  console.warn('\nGITHUB_PAT environment variable not found. GitHub requests may be rate-limited.\n');
}

const github = new GitHubApi({ ...fluentRepoDetails, token: process.env.GITHUB_PAT });

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
  const compareLink = tag && previousTag ? `<br/>\n[Compare changes](${repoUrl}/compare/${previousTag}..${tag})` : '';

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
    const message = spawnSync('git', ['log', '--pretty=format:%s', '-n', '1', entry.commit])
      .toString()
      .trim();
    const prMatch = message.split(/\r?\n/)[0].match(/\(#(\d+)\)$/m);
    if (prMatch) {
      return Number(prMatch[1]);
    }
  } catch (ex) {
    // ignore
  }

  // Or fetch from GitHub API
  const pr = await getPullRequestForCommit({ commit: entry.commit, github, repoDetails: fluentRepoDetails });
  return pr?.number;
}
