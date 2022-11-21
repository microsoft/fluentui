import { eslintTask } from 'just-scripts';
import * as path from 'path';
import * as constants from './eslint-constants';
import * as fs from 'fs';

const files = [path.join(process.cwd(), constants.directory)];
// used specifically for v9 packages
const storiesPath = path.join(process.cwd(), 'stories');
const hasStorySubfolder =
  fs.existsSync(storiesPath) &&
  fs
    .readdirSync(storiesPath)
    .map(subfolder => {
      const storyPath = path.join(storiesPath, subfolder);
      const storyFiles = !path.extname(storyPath).length ? fs.readdirSync(storyPath) : [];

      if (storyFiles.length) {
        return storyFiles.map(fileName => path.join(storiesPath, fileName));
      }
      return storyPath;
    })
    .flat()
    .some(fileName => constants.extensions.includes(path.extname(fileName)));

if (hasStorySubfolder) {
  files.push(storiesPath);
}

export const eslint = eslintTask({
  // TODO: also lint config files?
  files,
  extensions: constants.extensions,
  cache: true, // only lint files changed since last lint
  fix: process.argv.includes('--fix'),
  // If requested, display a table with 10 slowest rules after running.
  // (to display more, edit the `slice` call in the `display` function of node_modules/eslint/lib/linter/timing.js)
  timing: process.argv.includes('--timing'),
});
