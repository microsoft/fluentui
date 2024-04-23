import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  updateJson,
  visitNotIgnoredFiles,
} from '@nx/devkit';

import * as path from 'path';

import { PackageJson } from '../../types';
import { assertStoriesProject, isSplitProject } from '../split-library-in-two/shared';

import { BundleSizeConfigurationGeneratorSchema } from './schema';

export async function bundleSizeConfigurationGenerator(tree: Tree, schema: BundleSizeConfigurationGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  const project = readProjectConfiguration(tree, options.name);

  assertOptions(tree, { isSplitProject: isSplitProject(tree, project), project });

  const configPaths = {
    bundleSizeRoot: joinPathFragments(project.root, 'bundle-size'),
    bundleSizeConfig: joinPathFragments(project.root, 'monosize.config.mjs'),
  };

  generateFiles(tree, path.join(__dirname, 'files'), project.root, {
    packageName: options.name,
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

  updateJson(tree, joinPathFragments(project.root, 'package.json'), (json: PackageJson) => {
    json.scripts = json.scripts ?? {};
    json.scripts['bundle-size'] = 'monosize measure';
    return json;
  });

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, schema: BundleSizeConfigurationGeneratorSchema) {
  return {
    overrideBaseConfig: false,
    ...schema,
  };
}

function assertOptions(tree: Tree, options: { project: ProjectConfiguration; isSplitProject: boolean }) {
  assertStoriesProject(tree, options);
}

export default bundleSizeConfigurationGenerator;
