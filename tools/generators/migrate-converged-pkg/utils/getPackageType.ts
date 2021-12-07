import { Tree, readJson } from '@nrwl/devkit';
import { PackageJson } from '../../../types';
import { NormalizedSchema } from '../types';

export function getPackageType(tree: Tree, options: NormalizedSchema) {
  const tags = options.projectConfig.tags || [];

  const pkgJson: PackageJson = readJson(tree, options.paths.packageJson);
  const scripts = pkgJson.scripts || {};
  const isNode =
    tags.includes('platform:node') ||
    Boolean(pkgJson.bin) ||
    (scripts.build && scripts.build === 'just-scripts build --commonjs');
  const isWeb = tags.includes('platform:web') || !isNode;

  if (isNode) {
    return 'node';
  }

  if (isWeb) {
    return 'web';
  }

  throw new Error('Unable to determine type of package (web or node)');
}
