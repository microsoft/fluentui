/** Constants used by the eslint task and {@link file://./../../lint-staged/src/eslint-for-package.js } */
module.exports = {
  /** List of file extensions to lint, in format used by eslint (comma-separated, with leading .) */
  extensions: '.ts,.tsx,.js,.jsx',

  /** Subdirectory to lint within package (relative path) */
  directory: 'src',
};
