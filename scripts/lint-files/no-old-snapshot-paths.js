// @ts-check

const glob = require('glob');
const { findGitRoot } = require('../monorepo/index');

/**
 * @returns {boolean} true if there are issues
 */
function lintFiles() {
  const gitRoot = findGitRoot();

  const exampleFiles = glob.sync(
    'packages/{office-ui-fabric-react,react-cards,react-focus}/src/components/__snapshots__/*',
    { cwd: gitRoot },
  );
  if (exampleFiles.length) {
    console.error(
      '\nComponent example snapshot tests have moved. Please delete the following files and re-generate them ' +
        +'by running `yarn update-snapshots` from within `packages/react-examples`:',
    );
    for (const file of exampleFiles) {
      console.error('  ' + file);
    }
  }

  return !!exampleFiles.length;
}

module.exports = { lintFiles };
