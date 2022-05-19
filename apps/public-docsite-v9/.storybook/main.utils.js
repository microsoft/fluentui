/**
 * This file contains utils for main.js to mitigate diffs when migration generator is being invoked in batch (via --all flag)
 * Code in this module is supposed to run only against node js env (webpack) - thus it uses commonjs modules
 */

const fs = require('fs');
const path = require('path');

function getVnextStories() {
  /** @type {Record<string,unknown>} */
  const packageJson = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../../packages/react-components/react-components/package.json'),
      'utf-8',
    ),
  );

  const dependencies = /** @type {Record<string,string>} */ (packageJson.dependencies);

  return Object.keys({ ...dependencies, '@fluentui/react-components': '' })
    .filter(pkgName => pkgName.startsWith('@fluentui/'))
    .map(pkgName => {
      const name = pkgName.replace('@fluentui/', '');
      const storiesGlob = '/src/**/*.stories.@(ts|tsx|mdx)';

      return `../../../packages/react-components/${name}${storiesGlob}`;
    });
}

exports.getVnextStories = getVnextStories;
