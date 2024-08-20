import * as fs from 'fs';
import * as path from 'path';

import { eslintConstants } from '@fluentui/scripts-monorepo';
import { stripJsonComments } from '@nx/devkit';
import { eslintTask } from 'just-scripts';

const projectRoot = process.cwd();
const files = [path.join(projectRoot, eslintConstants.directory)];
const storiesPath = path.join(projectRoot, 'stories');

if (hasProjectStories(storiesPath)) {
  files.push(storiesPath);
}
if (usesJsoncEslintParser(projectRoot)) {
  files.push(path.join(projectRoot, 'package.json'));
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

function usesJsoncEslintParser(root: string) {
  const eslintConfigPath = path.join(root, '.eslintrc.json');
  if (!fs.existsSync(eslintConfigPath)) {
    return false;
  }

  const eslintConfig = JSON.parse(stripJsonComments(fs.readFileSync(eslintConfigPath, 'utf8')));
  const overrides: Array<{ files: string[]; parser?: string; rules: Record<string, unknown> }> =
    eslintConfig?.overrides ?? [];

  return overrides.some(override => override?.parser === 'jsonc-eslint-parser');
}

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
