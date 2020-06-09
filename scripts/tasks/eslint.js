// @ts-check

const { eslintTask } = require('just-scripts');
const path = require('path');

exports.eslint = eslintTask({
  // TODO: also lint config files?
  files: [path.join(process.cwd(), 'src')],
  extensions: '.ts,.tsx,.js,.jsx',
  fix: process.argv.includes('--fix'),
  // If requested, display a table with 10 slowest rules after running.
  // (to display more, edit the `slice` call in the `display` function of node_modules/eslint/lib/linter/timing.js)
  timing: process.argv.includes('--timing'),
});
