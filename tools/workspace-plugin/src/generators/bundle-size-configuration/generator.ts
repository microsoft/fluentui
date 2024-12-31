import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  visitNotIgnoredFiles,
} from '@nx/devkit';

import * as path from 'path';

import { getNpmScope } from '../../utils';
import { assertStoriesProject, isSplitProject } from '../split-library-in-two/shared';

import { BundleSizeConfigurationGeneratorSchema } from './schema';

export async function bundleSizeConfigurationGenerator(tree: Tree, schema: BundleSizeConfigurationGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  const project = readProjectConfiguration(tree, options.project);

  assertOptions(tree, { isSplitProject: isSplitProject(tree, project), project });

  const configPaths = {
    bundleSizeRoot: joinPathFragments(project.root, 'bundle-size'),
    bundleSizeConfig: joinPathFragments(project.root, 'monosize.config.mjs'),
  };

  generateFiles(tree, path.join(__dirname, 'files'), project.root, {
    projectName: project.name,
    npmPackageName: `@${options.npmScope}/${project.name}`,
    rootOffset: offsetFromRoot(project.root),
  });

  let hasFixtures = false;
  visitNotIgnoredFiles(tree, configPaths.bundleSizeRoot, filePath => {
    if (!filePath.endsWith('index.fixture.js') && filePath.endsWith('.fixture.js')) {
      hasFixtures = true;
    }
  });

  if (hasFixtures) {
    tree.delete(joinPathFragments(configPaths.bundleSizeRoot, 'index.fixture.js'));
  }

  if (options.overrideBaseConfig === false) {
    tree.delete(configPaths.bundleSizeConfig);
  }

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, schema: BundleSizeConfigurationGeneratorSchema) {
  return {
    overrideBaseConfig: false,
    npmScope: getNpmScope(tree),
    ...schema,
  };
}

function assertOptions(tree: Tree, options: { project: ProjectConfiguration; isSplitProject: boolean }) {
  assertStoriesProject(tree, options);
}

export default bundleSizeConfigurationGenerator;
