import { Tree, updateJson } from '@nrwl/devkit';
import { NormalizedSchema } from '../types';
import { getPackageType } from '../utils';

export function updateNpmScripts(tree: Tree, options: NormalizedSchema) {
  /* eslint-disable @fluentui/max-len */
  const scripts = {
    docs: 'api-extractor run --config=config/api-extractor.local.json --local',
    'build:local': `tsc -p ./tsconfig.lib.json --module esnext --emitDeclarationOnly && node ../../scripts/typescript/normalize-import --output ./dist/packages/${options.normalizedPkgName}/src && yarn docs`,
    storybook: 'start-storybook',
    start: 'yarn storybook',
    test: 'jest --passWithNoTests',
    'type-check': 'tsc -b tsconfig.json',
  };
  /* eslint-enable @fluentui/max-len */
  updateJson(tree, options.paths.packageJson, json => {
    delete json.scripts['update-snapshots'];
    delete json.scripts['start-test'];
    delete json.scripts['test:watch'];

    Object.assign(json.scripts, scripts);

    if (getPackageType(tree, options) === 'node') {
      delete json.scripts.start;
      delete json.scripts.storybook;
    }

    return json;
  });

  return tree;
}
