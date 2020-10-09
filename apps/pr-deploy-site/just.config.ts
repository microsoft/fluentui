import fs from 'fs';
import path from 'path';
import { preset, just } from '@uifabric/build';
import { findGitRoot, getAllPackageInfo } from '@uifabric/build/monorepo/index';

const { series, task, copyInstructionsTask, copyInstructions } = just;

const gitRoot = findGitRoot();
let instructions = copyInstructions.copyFilesToDestinationDirectory(
  ['pr-deploy-site.js', 'pr-deploy-site.css', 'chiclet-test.html'],
  'dist',
);

// If you are adding a new tile into this site, please make sure it is also listed in the siteInfo of
// `pr-deploy-site.js`
//
// Dependencies are listed here and NOT in package.json because we do not want to allow for partial builds for scoping
const dependencies = [
  '@fluentui/docs',
  '@fluentui/perf-test',
  '@fluentui/react-avatar',
  '@fluentui/react-button',
  '@fluentui/react-checkbox',
  '@fluentui/react-image',
  '@fluentui/react-link',
  '@fluentui/react-next',
  '@fluentui/react-slider',
  '@fluentui/react-tabs',
  '@fluentui/react-text',
  '@fluentui/react-toggle',
  '@uifabric/charting',
  '@uifabric/date-time',
  '@uifabric/experiments',
  '@fluentui/public-docsite',
  '@fluentui/public-docsite-resources',
  '@fluentui/react',
  'perf-test',
  'theming-designer',
  'todo-app',
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

  const distStorybookPath = path.join(gitRoot, dep.packagePath, 'dist-storybook');

  if (fs.existsSync(distStorybookPath)) {
    let sourcePath = distStorybookPath;
    instructions.push(
      ...copyInstructions.copyFilesToDestinationDirectory(
        sourcePath,
        path.join('dist', path.basename(dep.packagePath)),
      ),
    );
    deployedPackages.add(dep.packageJson.name);
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
