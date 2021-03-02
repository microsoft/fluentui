import fs from 'fs';
import path from 'path';
import { preset, series, task, copyInstructionsTask, copyInstructions } from '@fluentui/scripts';
import { findGitRoot, getAllPackageInfo } from '@fluentui/scripts/monorepo/index';

const gitRoot = findGitRoot();
let instructions = copyInstructions.copyFilesToDestinationDirectory(
  ['pr-deploy-site.js', 'pr-deploy-site.css', 'chiclet-test.html'],
  'dist',
);

// If you are adding a new tile into this site, please make sure it is also listed in the siteInfo of
// `pr-deploy-site.js`
//
// Dependencies are listed here and NOT in package.json because declaring in package.json would
// prevent scoped/partial builds from working. (Since the demo site has both v0 and v8 packages,
// it would cause both of those dependency trees to get built every time.)
const dependencies = [
  '@fluentui/docs',
  '@fluentui/perf-test',
  '@fluentui/public-docsite-resources',
  '@fluentui/public-docsite',
  '@fluentui/react',
  '@fluentui/react-avatar',
  '@fluentui/react-button',
  '@fluentui/react-charting',
  '@fluentui/react-checkbox',
  '@fluentui/react-experiments',
  '@fluentui/react-image',
  '@fluentui/react-link',
  '@fluentui/react-slider',
  '@fluentui/react-tabs',
  '@fluentui/react-text',
  '@fluentui/react-toggle',
  'perf-test',
  'theming-designer',
];

const allPackages = getAllPackageInfo();
const repoDeps = dependencies.map(dep => allPackages[dep]);
const deployedPackages = new Set<string>();
repoDeps.forEach(dep => {
  const distPath = path.join(gitRoot, dep.packagePath, 'dist');

  if (fs.existsSync(distPath)) {
    let sourcePath = distPath;

    if (dep.packageJson.name === '@fluentui/docs') {
      instructions.push(...copyInstructions.copyFilesInDirectory(sourcePath, path.join('dist', 'react-northstar')));
      deployedPackages.add(dep.packageJson.name);
    } else if (dep.packageJson.name === '@fluentui/perf-test') {
      instructions.push(...copyInstructions.copyFilesInDirectory(sourcePath, path.join('dist', 'perf-test-northstar')));
      deployedPackages.add(dep.packageJson.name);
    } else {
      instructions.push(
        ...copyInstructions.copyFilesInDirectory(sourcePath, path.join('dist', path.basename(dep.packagePath))),
      );
      deployedPackages.add(dep.packageJson.name);
    }
  }
});

preset();

/**
 * Renders a site with tiles that are potentially from a partial set of deployed packages
 */
task('generate:index', () => {
  const indexContent = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');
  fs.writeFileSync(
    path.join('dist', 'index.html'),
    indexContent.replace('/* insert packages here */', JSON.stringify([...deployedPackages])),
  );
});

/**
 * Copies all the built (potentially partially) dist files and then generates a index HTML for it
 */
task('generate:site', series(copyInstructionsTask({ copyInstructions: instructions }), 'generate:index'));
