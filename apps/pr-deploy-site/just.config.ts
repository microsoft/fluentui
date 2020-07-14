import fs from 'fs';
import path from 'path';
import { preset, just } from '@uifabric/build';
import { findRepoDeps, findGitRoot } from '@uifabric/build/monorepo/index';

const { task, copyInstructionsTask, copyInstructions } = just;

const gitRoot = findGitRoot();
let instructions = copyInstructions.copyFilesToDestinationDirectory(['index.html', 'chiclet-test.html'], 'dist');

const repoDeps = findRepoDeps();
repoDeps.forEach(dep => {
  const distPath = path.join(gitRoot, dep.packagePath, 'dist');

  if (fs.existsSync(distPath)) {
    let sourcePath = distPath;

    // NOTE for backwards compatibility: @uifabric/* projects gets the dist folders themselves copied
    // otherwise copy the contents not the dist directory itself
    if (dep.packageJson.name.includes('@uifabric')) {
      instructions.push(
        ...copyInstructions.copyFilesToDestinationDirectory(
          sourcePath,
          path.join('dist', path.basename(dep.packagePath)),
        ),
      );
    } else if (dep.packageJson.name === '@fluentui/docs') {
      instructions.push(...copyInstructions.copyFilesInDirectory(sourcePath, path.join('dist', 'react-northstar')));
    } else {
      instructions.push(
        ...copyInstructions.copyFilesInDirectory(sourcePath, path.join('dist', path.basename(dep.packagePath))),
      );
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
  }
});

preset();

task('bundle', copyInstructionsTask({ copyInstructions: instructions }));
