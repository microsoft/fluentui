/**
 * This file contains utils for main.js to mitigate diffs when migration generator is being invoked in batch (via --all flag)
 * Code in this module is supposed to run only against node js env (webpack) - thus it uses commonjs modules
 */

const fs = require('fs');
const path = require('path');

// Dependencies to exclude stories loading
const excludedDependencies = ['@fluentui/react-overflow'];

function getVnextStories() {
  /** @type {Record<string,unknown>} */
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../package.json`), 'utf-8'));

  const dependencies = /** @type {Record<string,string>} */ (packageJson.dependencies);

  return Object.keys(dependencies)
    .filter(pkgName => pkgName.startsWith('@fluentui/') && !excludedDependencies.includes(pkgName))
    .map(pkgName => {
      const name = pkgName.replace('@fluentui/', '');
      const storiesGlob = '/src/**/@(index.stories.@(ts|tsx)|*.stories.mdx)';

      return `../../${name}${storiesGlob}`;
    });
}

exports.getVnextStories = getVnextStories;
