const cp = require('child_process');
const semver = require('semver');

/**
 * Returns a single markdown changelog by concatenating of the react-* dependencies' changelogs in react-components
 * between two versions of react-components. Useful for creating an "upgrade" guide from one version of react-components
 * to another.
 *
 * @param fromVersion - The NPM package version of @fluentui/react-components to start from
 * @param toVersion - The NPM package version of @fluentui/react-components to stop at
 * @return {string} - Markdown
 */
function reactComponentsChangelog(fromVersion, toVersion) {
  let markdown = [];

  let fromDepsJSON;
  let toDepsJSON;
  try {
    fromDepsJSON = JSON.parse(cp.execSync(`npm view @fluentui/react-components@${fromVersion} dependencies --json`));
    toDepsJSON = JSON.parse(cp.execSync(`npm view @fluentui/react-components@${toVersion} dependencies --json`));
  } catch (err) {
    console.error(`Failed to get deps for @fluentui/react-components:`);
    console.error(err);
  }

  const dependencyNames = Object.keys({ ...fromDepsJSON, ...toDepsJSON }).filter(packageName =>
    packageName.startsWith('@fluentui/react-'),
  );

  markdown.push('# CHANGELOG - @fluentui/react-components');
  markdown.push(`*${fromVersion} - ${toVersion}*`);

  dependencyNames.forEach(packageName => {
    const dirName = packageName.replace('@fluentui/', '');
    const changelogJSON = require(`../../packages/${dirName}/CHANGELOG.json`);

    const changelogEntries = changelogJSON.entries
      //
      // STEP 1: Only get changelog entries that are in range of react-components we care about
      //
      .filter(entry => {
        return (
          (semver.gt(entry.version, fromDepsJSON[packageName].replace(/\^/, '')) ||
            semver.satisfies(entry.version, fromDepsJSON[packageName])) &&
          semver.lt(entry.version, toDepsJSON[packageName].replace(/\^/, ''))
        );
      })
      //
      // STEP 2: remove "Bump ..." comments and entire comment sections with bumps only
      //
      .map(entry => {
        entry.comments = Object.entries(entry.comments).reduce((acc, [commentType, commentObj]) => {
          const commentsWithoutBumps = Object.values(commentObj).filter(
            comment => !/^Bump .*? to v.*?$/.test(comment.comment),
          );
          if (commentsWithoutBumps.length > 0) {
            acc[commentType] = commentsWithoutBumps;
          }
          return acc;
        }, {});
        return entry;
      })
      //
      // STEP 3: Remove changelog entry sections with no comments
      //
      .filter(entry => {
        return Object.keys(entry.comments).length > 0;
      });

    if (changelogEntries.length > 0) {
      markdown.push(`\n## ${packageName}`);

      const flatComments = changelogEntries.reduce((acc, entry) => {
        Object.values(entry.comments).forEach(comments => {
          comments.forEach(comment => {
            acc.push(`- ${comment.comment} *(by ${comment.author} in v${entry.version})*`);
          });
        });
        return acc;
      }, []);

      markdown.push(...flatComments);
    }
  });

  markdown.push('\n');
  return markdown.join('\n');
}

////////////////////////////////////////
// Usage
const markdownChangelog = reactComponentsChangelog('9.0.0-alpha.88', '9.0.0-alpha.89');

console.log(markdownChangelog);
