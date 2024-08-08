main(process.argv.slice(2));

/**
 *
 * @param {string[]} changedFiles - array of changed files paths
 */
function main(changedFiles) {
  const wasYarnLockChanged = changedFiles.some(arg => arg.includes('yarn.lock'));

  if (wasYarnLockChanged) {
    console.warn(
      [
        '⚠️ ----------------------------------------------------------------------------------------- ⚠️',
        '⚠️ yarn.lock changed, please run `yarn install` to ensure your packages are up to date.      ⚠️',
        '⚠️ ----------------------------------------------------------------------------------------- ⚠️',
      ].join('\n'),
    );
  }
}
