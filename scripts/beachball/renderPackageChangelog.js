const { groupBy } = require('lodash');
const { owner, repo } = require('../githubInfo');

function renderPackageChangelog({ packageChangelog, isGroupedChangelog, changelogJson }) {
  const header = packageChangelog.tag
    ? `[${packageChangelog.version}](https://github.com/${owner}/${repo}/tree/${packageChangelog.tag})`
    : packageChangelog.version;

  const previousChangelogEntry = changelogJson && changelogJson.entries ? changelogJson.entries[0] : undefined;
  let subHeader = packageChangelog.date.toUTCString();
  subHeader +=
    packageChangelog.tag && previousChangelogEntry && previousChangelogEntry.tag
      ? `\n[Compare changes](https://github.com/${owner}/${repo}/compare/${previousChangelogEntry.tag}..${packageChangelog.tag})`
      : '';

  return (
    `\n## ${header}\n` +
    `${subHeader}\n` +
    (packageChangelog.comments.major
      ? '\n### Major\n\n' + renderChangelogEntries(packageChangelog.comments.major, isGroupedChangelog)
      : '') +
    (packageChangelog.comments.minor
      ? '\n### Minor changes\n\n' + renderChangelogEntries(packageChangelog.comments.minor, isGroupedChangelog)
      : '') +
    (packageChangelog.comments.patch
      ? '\n### Patches\n\n' + renderChangelogEntries(packageChangelog.comments.patch, isGroupedChangelog)
      : '') +
    (packageChangelog.comments.prerelease
      ? '\n### Changes\n\n' + renderChangelogEntries(packageChangelog.comments.prerelease, isGroupedChangelog)
      : '')
  );
}

function renderChangelogEntries(entries, includePackageInfo) {
  if (includePackageInfo) {
    const entriesMap = groupBy(entries, entry => entry.package);

    let result = '';
    Object.keys(entriesMap).forEach(pkgName => {
      const entries = entriesMap[pkgName];
      result += `- \`${pkgName}\`\n`;
      entries.forEach(entry => {
        result += `  - ${entry.comment} (${entry.author})\n`;
      });
    });

    return result;
  }

  return entries
    .map(entry => {
      return `- ${entry.comment} (${entry.author})`;
    })
    .join('\n');
}

module.exports = renderPackageChangelog;
