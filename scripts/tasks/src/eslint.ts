import * as fs from 'fs';
import * as path from 'path';

import { eslintConstants } from '@fluentui/scripts-monorepo';
import { eslintTask } from 'just-scripts';

const files = [path.join(process.cwd(), eslintConstants.directory)];
const storiesPath = path.join(process.cwd(), 'stories');

if (hasProjectStories(storiesPath)) {
  files.push(storiesPath);
}

export const eslint = eslintTask({
  // TODO: also lint config files?
  files,
  extensions: eslintConstants.extensions,
  cache: true, // only lint files changed since last lint
  fix: process.argv.includes('--fix'),
  // If requested, display a table with 10 slowest rules after running.
  // (to display more, edit the `slice` call in the `display` function of node_modules/eslint/lib/linter/timing.js)
  timing: process.argv.includes('--timing'),
});

function hasProjectStories(root: string) {
  const gitKeep = path.join(root, '.gitkeep');
  if (!fs.existsSync(root)) {
    return false;
  }
  if (fs.existsSync(gitKeep)) {
    return false;
  }

  return true;
}
