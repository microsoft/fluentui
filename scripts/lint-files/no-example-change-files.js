// @ts-check

const glob = require('glob');
const { findGitRoot } = require('../monorepo/index');

/**
 * @returns {boolean} true if there are issues
 */
function lintFiles() {
  const gitRoot = findGitRoot();

  const changeFiles = glob.sync('change/{@fluentui-react-examples,@uifabric-api-docs,@uifabric-fabric-website}*', {
    cwd: gitRoot,
  });
  if (changeFiles.length) {
    console.error('\nPlease remove these change files for packages which are no longer published:');
    for (const file of changeFiles) {
      console.error('  ' + file);
    }
  }

  return !!changeFiles.length;
}

module.exports = { lintFiles };
