import * as fs from 'node:fs';
import * as path from 'node:path';

import { isConvergedPackage, workspaceRoot } from '@fluentui/scripts-monorepo';
import * as glob from 'glob';

export function getRawMetadata(projectRoot: string) {
  const root = path.resolve(workspaceRoot, projectRoot);
  const packageJsonPath = path.join(root, 'package.json');
  const projectJsonPath = path.join(root, 'project.json');

  const project: import('@nx/devkit').ProjectConfiguration = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
  const packageJson: import('nx/src/utils/package-json').PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  );

  const metadata = { project, packageJson };

  const isConverged = () => isConvergedPackage(metadata);

  function shipsAMD() {
    if (project.projectType !== 'library') {
      return false;
    }

    const tags = new Set(project.tags ?? []);

    const isV8 = tags.has('v8');
    const isV9 = tags.has('vNext');
    const needsAMD = tags.has('ships-amd');
    const isMixedProject = isV9 && isV8;

    if (needsAMD) {
      return true;
    }
    if (isMixedProject) {
      return true;
    }
    if (isV9) {
      return false;
    }
    return true;
  }

  function hasJest() {
    return fs.existsSync(path.join(projectRoot, 'jest.config.js'));
  }
  function hasBabel() {
    return fs.existsSync(path.join(projectRoot, '.babelrc.json'));
  }
  function hasSass() {
    return glob.sync(path.join(projectRoot, 'src/**/*.scss')).length > 0;
  }

  return { ...metadata, isConverged, shipsAMD, hasJest, hasBabel, hasSass };
}
