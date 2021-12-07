import { Tree, updateJson, readJson, visitNotIgnoredFiles, serializeJson } from '@nrwl/devkit';
import { PackageJson, TsConfig } from '../../../types';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';
import { globsToJs, isJs, uniqueArray } from '../utils';

const template = {
  projectReferences: { path: './.storybook/tsconfig.json' },
  exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
};

export function updateStorybook(tree: Tree, options: NormalizedSchema) {
  const sbAction = getStorybookAction(tree, options);

  if (sbAction === 'init') {
    initStorybook(tree, options);
  }

  if (sbAction === 'remove') {
    removeStorybook(tree, options);
  }

  return tree;
}

function getStorybookAction(tree: Tree, options: NormalizedSchema) {
  const hasStorybookConfig = tree.exists(options.paths.storybook.main);
  let hasStories = false;

  visitNotIgnoredFiles(tree, options.projectConfig.root, treePath => {
    if (treePath.includes('.stories.')) {
      hasStories = true;
      return;
    }
  });

  const tags = options.projectConfig.tags || [];
  const hasTags = tags.includes('vNext') && tags.includes('platform:web');

  const shouldInit = hasStories || hasTags;
  const shouldDelete = !shouldInit && hasStorybookConfig;

  if (shouldInit) {
    return 'init';
  }

  if (shouldDelete) {
    return 'remove';
  }
}

function initStorybook(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.storybook.tsconfig, serializeJson(templates.storybook.tsconfig));
  tree.write(options.paths.storybook.main, templates.storybook.main);
  tree.write(options.paths.storybook.preview, templates.storybook.preview);

  const libTsConfig: TsConfig = readJson(tree, options.paths.tsconfig.lib);

  updateJson(tree, options.paths.storybook.tsconfig, (json: TsConfig) => {
    json.compilerOptions.types = json.compilerOptions.types || [];

    json.compilerOptions.types.push(...(libTsConfig.compilerOptions.types || []), 'storybook__addons');
    json.compilerOptions.types = uniqueArray(json.compilerOptions.types);

    return json;
  });

  // update main ts with project references
  updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
    json.references = json.references || [];

    json.references.push(template.projectReferences);

    return json;
  });

  // update lib ts with new exclude globs
  updateJson(tree, options.paths.tsconfig.lib, (json: TsConfig) => {
    json.exclude = json.exclude || [];

    json.exclude.push(...template.exclude);

    if (isJs(tree, options)) {
      json.exclude = globsToJs(json.exclude);
    }

    json.exclude = uniqueArray(json.exclude);

    return json;
  });

  removeTsIgnorePragmas(tree, options);
}

function removeStorybook(tree: Tree, options: NormalizedSchema) {
  tree.delete(options.paths.storybook.rootFolder);
  updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
    json.scripts = json.scripts || {};

    delete json.scripts.start;
    delete json.scripts.storybook;
    delete json.scripts['build-storybook'];

    return json;
  });

  // update main ts with project references
  updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
    json.references = json.references || [];

    json.references = json.references.filter(projectRef => projectRef.path !== template.projectReferences.path);

    return json;
  });

  // update lib ts with new exclude globs
  updateJson(tree, options.paths.tsconfig.lib, (json: TsConfig) => {
    const js = isJs(tree, options);
    const excludeGlobs = js ? globsToJs(template.exclude) : template.exclude;
    json.exclude = (json.exclude || []).filter(excludeGlob => {
      return !excludeGlobs.includes(excludeGlob);
    });

    return json;
  });
}

function removeTsIgnorePragmas(tree: Tree, options: NormalizedSchema) {
  const stories: string[] = [];
  visitNotIgnoredFiles(tree, options.paths.sourceRoot, treePath => {
    if (treePath.includes('.stories.')) {
      stories.push(treePath);
    }
  });

  stories.forEach(storyPath => {
    const content = tree.read(storyPath)?.toString('utf-8');

    if (!content) {
      throw new Error('story file has no code');
    }

    let updatedContent = content.replace(/\/\/\s+@ts-ignore/g, '');
    updatedContent = updatedContent.replace(
      /\/\/\s+eslint-disable-next-line\s+@typescript-eslint\/ban-ts-comment/g,
      '',
    );
    updatedContent = updatedContent.replace(
      /\/\/\s+https:\/\/github\.com\/microsoft\/fluentui\/pull\/18695#issuecomment-868432982/g,
      '',
    );

    tree.write(storyPath, updatedContent);
  });

  return tree;
}
