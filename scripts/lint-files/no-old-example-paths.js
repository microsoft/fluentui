// @ts-check

const glob = require('glob');
const { findGitRoot } = require('../monorepo/index');

/**
 * @returns {boolean} true if there are issues
 */
function lintFiles() {
  const gitRoot = findGitRoot();

  const exampleFiles = [
    ...glob.sync('packages/!(react-examples)/!(node_modules)/**/(docs|examples)/*', { cwd: gitRoot }),
    ...glob.sync('packages/!(react-examples)/!(node_modules)/**/*.doc.ts*', { cwd: gitRoot }),
  ];
  if (exampleFiles.length) {
    console.error('\nPlease move the following files to the appropriate locations under packages/react-examples:');
    for (const file of exampleFiles) {
      console.error('  ' + file);
    }
  }

  return !!exampleFiles.length;
}

module.exports = { lintFiles };
