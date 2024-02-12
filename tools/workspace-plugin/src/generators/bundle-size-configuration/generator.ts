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

  const config = readProjectConfiguration(tree, options.name);
  const configPaths = {
    bundleSizeRoot: joinPathFragments(config.root, 'bundle-size'),
    bundleSizeConfig: joinPathFragments(config.root, 'monosize.config.mjs'),
  };

  generateFiles(tree, path.join(__dirname, 'files'), config.root, {
    packageName: options.name,
    rootOffset: offsetFromRoot(config.root),
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

  updateJson(tree, joinPathFragments(config.root, 'package.json'), (json: PackageJson) => {
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

export default bundleSizeConfigurationGenerator;
