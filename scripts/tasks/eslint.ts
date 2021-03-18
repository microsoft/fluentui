import { eslintTask } from 'just-scripts';
import * as configHelpers from '@fluentui/eslint-plugin/src/utils/configHelpers';

export const eslint = eslintTask({
  extensions: configHelpers.extensions.join(','),
  cache: true, // only lint files changed since last lint
  fix: process.argv.includes('--fix'),
  // If requested, display a table with 10 slowest rules after running.
  // (to display more, edit the `slice` call in the `display` function of node_modules/eslint/lib/linter/timing.js)
  timing: process.argv.includes('--timing'),
});
