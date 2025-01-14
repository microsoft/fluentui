main(process.argv.slice(2));

/**
 *
 * @param {string[]} changedFiles - array of changed files paths
 */
function main(changedFiles) {
  const wasYarnLockChanged = changedFiles.some(arg => arg.includes('yarn.lock'));
  const wasNxChanged = changedFiles.some(arg => arg.includes('nx.json') || arg.includes('project.json'));

  if (wasYarnLockChanged) {
    console.warn(
      renderNotification('yarn.lock changed, please run `yarn install` to ensure your packages are up to date.'),
    );
  }
  if (wasNxChanged) {
    console.warn(renderNotification('nx.json changed, please run `yarn nx reset` to ensure nx graph is up to date.'));
  }
}

/**
 *
 * @param {string} title
 * @returns {string}
 */
function renderNotification(title) {
  const titleLength = title.length;
  const fillWithDashes = '-'.repeat(titleLength + 4);

  return [`⚠️ ${fillWithDashes} ⚠️`, `⚠️   ${title}   ⚠️`, `⚠️ ${fillWithDashes} ⚠️`].join('\n');
}
