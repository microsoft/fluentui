import fs from 'fs';
import path from 'path';
import { series, task, copyInstructionsTask, copyInstructions, cleanTask } from '@fluentui/scripts-tasks';
import { findGitRoot, getAllPackageInfo } from '@fluentui/scripts-monorepo';

task('clean', cleanTask());

const gitRoot = findGitRoot();
const instructions = copyInstructions.copyFilesToDestinationDirectory(
  ['pr-deploy-site.css', 'chiclet-test.html', 'index.html'],
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
  '@fluentui/perf-test-northstar',
  '@fluentui/public-docsite-resources',
  '@fluentui/public-docsite',
  '@fluentui/react',
  '@fluentui/react-charting',
  '@fluentui/public-docsite-v9',
  '@fluentui/react-experiments',
  '@fluentui/web-components',
  '@fluentui/perf-test',
  '@fluentui/theming-designer',
  '@fluentui/theme-designer',
  '@fluentui/perf-test-react-components',
];

const allPackages = getAllPackageInfo();
const repoDeps = dependencies.map(dep => allPackages[dep]);
const deployedPackages = new Set<string>();
repoDeps.forEach(dep => {
  const packageDist = path.join(gitRoot, dep.packagePath, 'dist');

  if (fs.existsSync(packageDist)) {
    if (dep.packageJson.name === '@fluentui/docs') {
      instructions.push(...copyInstructions.copyFilesInDirectory(packageDist, path.join('dist', 'react-northstar')));
      deployedPackages.add(dep.packageJson.name);
    } else if (dep.packageJson.name === '@fluentui/perf-test-northstar') {
      instructions.push(
        ...copyInstructions.copyFilesInDirectory(packageDist, path.join('dist', 'perf-test-northstar')),
      );
      deployedPackages.add(dep.packageJson.name);
    } else {
      instructions.push(
        ...copyInstructions.copyFilesInDirectory(packageDist, path.join('dist', path.basename(dep.packagePath))),
      );
      deployedPackages.add(dep.packageJson.name);
    }
  }
});

/**
 * Sets the list of tiles to render based on which packages were actually built
 */
task('generate:js', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, './pr-deploy-site.js'), 'utf-8');

  if (!jsContent.includes('var packages;')) {
    console.error('pr-deploy-site.js must contain a line "var packages;" to replace with the actual packages');
    process.exit(1);
  }

  fs.writeFileSync(
    path.join('dist', 'pr-deploy-site.js'),
    jsContent.replace('var packages;', `var packages = ${JSON.stringify([...deployedPackages])};`),
  );
});

/**
 * Copies all the built dist files and updates the JS to load the ones that were actually built
 */
task('generate:site', series(copyInstructionsTask({ copyInstructions: instructions }), 'generate:js'));
