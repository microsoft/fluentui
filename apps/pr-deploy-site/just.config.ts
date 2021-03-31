import fs from 'fs';
import path from 'path';
import { just } from '@uifabric/build';
import { findGitRoot, getAllPackageInfo } from '@uifabric/build/monorepo/index';

const { series, task, copyInstructionsTask, copyInstructions, cleanTask } = just;

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
// prevent scoped/partial builds from working.
const dependencies = [
  '@fluentui/react-button',
  '@uifabric/charting',
  '@uifabric/date-time',
  '@uifabric/experiments',
  '@uifabric/fabric-website',
  '@uifabric/fabric-website-resources',
  'office-ui-fabric-react',
  'perf-test',
  'theming-designer',
  'todo-app',
];

const allPackages = getAllPackageInfo();
const repoDeps = dependencies.map(dep => allPackages[dep]);
const deployedPackages = new Set<string>();
repoDeps.forEach(dep => {
  const packageDistPath = path.join(gitRoot, dep.packagePath, 'dist');

  if (fs.existsSync(packageDistPath)) {
    // NOTE for backwards compatibility: @uifabric/* projects gets the dist folders themselves copied
    // otherwise copy the contents not the dist directory itself
    if (dep.packageJson.name.includes('@uifabric')) {
      instructions.push(
        ...copyInstructions.copyFilesToDestinationDirectory(
          packageDistPath,
          path.join('dist', path.basename(dep.packagePath)),
        ),
      );
      deployedPackages.add(dep.packageJson.name);
    } else {
      instructions.push(
        ...copyInstructions.copyFilesInDirectory(packageDistPath, path.join('dist', path.basename(dep.packagePath))),
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
