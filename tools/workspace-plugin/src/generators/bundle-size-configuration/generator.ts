import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
  updateJson,
  visitNotIgnoredFiles,
} from '@nx/devkit';
import * as path from 'path';
import { PackageJson } from '../../types';
import { BundleSizeConfigurationGeneratorSchema } from './schema';

export async function bundleSizeConfigurationGenerator(tree: Tree, schema: BundleSizeConfigurationGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  const project = readProjectConfiguration(tree, options.name);

  const isSplitProject = tree.exists(joinPathFragments(project.root, '../stories/project.json'));

  assertOptions(tree, { isSplitProject, ...options });

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

function assertOptions(tree: Tree, options: ReturnType<typeof normalizeOptions> & { isSplitProject: boolean }) {
  if (options.isSplitProject && options.name.endsWith('-stories')) {
    throw new Error(
      `This generator can be invoked only against library project. Please run it against "${options.name.replace(
        '-stories',
        '',
      )}" library project.`,
    );
  }
}

export default bundleSizeConfigurationGenerator;
