import { Tree, formatFiles, writeJson } from '@nx/devkit';
import { isEqual } from 'lodash';

import { TsconfigBaseAllGeneratorSchema } from './schema';
import { createPathAliasesConfig } from './lib/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: TsconfigBaseAllGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const { existingTsConfig, mergedTsConfig, tsConfigAllPath } = createPathAliasesConfig(tree);

  if (!normalizedOptions.verify) {
    writeJson(tree, tsConfigAllPath, mergedTsConfig);

    if (!normalizedOptions.skipFormat) {
      await formatFiles(tree);
    }

    return;
  }

  if (!isEqual(existingTsConfig, mergedTsConfig)) {
    throw new Error(`
      🚨 ${tsConfigAllPath} is out of date.

      Please update it by running  'yarn nx g @fluentui/workspace-plugin:tsconfig-base-all'.
    `);
  }

  console.log('✅ tsconfig.base.all.json is up to date');
}

function normalizeOptions(tree: Tree, options: TsconfigBaseAllGeneratorSchema) {
  const defaults = { verify: false };
  return {
    ...defaults,
    ...options,
  };
}
