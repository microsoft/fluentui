import {
  moveFilesToNewDirectory,
  formatFiles,
  readProjectConfiguration,
  Tree,
  visitNotIgnoredFiles,
  stripIndents,
  writeJson,
  addProjectConfiguration,
  updateProjectConfiguration,
  offsetFromRoot,
  joinPathFragments,
  updateJson,
  readJson,
} from '@nx/devkit';

import * as path from 'path';
import { TsConfig } from '../../types';
import { SplitLibraryInTwoGeneratorSchema } from './schema';

interface Options extends SplitLibraryInTwoGeneratorSchema {
  projectConfig: ReturnType<typeof readProjectConfiguration>;
  projectOffsetFromRoot: { old: string; updated: string };
  oldContent: {
    tsConfig: Record<string, unknown>;
    eslintrc: Record<string, unknown>;
  };
}

export async function splitLibraryInTwoGenerator(tree: Tree, options: SplitLibraryInTwoGeneratorSchema) {
  const projectConfig = readProjectConfiguration(tree, options.project);

  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });

  const eslintRcPath = path.join(projectConfig.root, '.eslintrc.json');

  const normalizedOptions = {
    ...options,
    projectConfig,
    projectOffsetFromRoot: {
      old: offsetFromRoot(projectConfig.root),
      updated: offsetFromRoot(projectConfig.root) + '../',
    },
    oldContent: {
      eslintrc: tree.exists(eslintRcPath) ? readJson(tree, eslintRcPath) : {},
      tsConfig: readJson(tree, path.join(projectConfig.root, 'tsconfig.json')),
    },
  };

  cleanup(tree, normalizedOptions);

  splitSrcToLibrary(tree, normalizedOptions);
  makeStoriesLibrary(tree, normalizedOptions);

  await formatFiles(tree);
}

export default splitLibraryInTwoGenerator;

function cleanup(tree: Tree, options: Options) {
  tree.delete(path.join(options.projectConfig.root, 'dist'));
  tree.delete(path.join(options.projectConfig.root, 'lib'));
  tree.delete(path.join(options.projectConfig.root, 'lib-commonjs'));
  tree.delete(path.join(options.projectConfig.root, 'temp'));
  tree.delete(path.join(options.projectConfig.root, '.eslintcache'));
  tree.delete(path.join(options.projectConfig.root, '.swc'));
  tree.delete(path.join(options.projectConfig.root, 'node_modules'));
}

function splitSrcToLibrary(tree: Tree, options: Options) {
  const newProjectRoot = path.join(options.projectConfig.root, 'library');
  const newProjectSourceRoot = path.join(newProjectRoot, 'src');

  visitNotIgnoredFiles(tree, options.projectConfig.root, file => {
    if (file.includes('/stories/') || file.includes('/.storybook/')) {
      return;
    }

    tree.rename(file, file.replace(options.projectConfig.root, newProjectRoot));
  });

  updateProjectConfiguration(tree, options.projectConfig.name!, {
    ...options.projectConfig,
    // @ts-expect-error - nx doesn't type $schema prop
    $schema: joinPathFragments(options.projectOffsetFromRoot.updated, 'node_modules/nx/schemas/project-schema.json'),
    root: newProjectRoot,
    sourceRoot: newProjectSourceRoot,
  });

  updateJson(tree, path.join(newProjectRoot, 'package.json'), json => {
    json.scripts ??= {};
    json.scripts.storybook = 'yarn --cwd ../stories storybook';
    json.scripts['type-check'] = 'just-scripts type-check';
    return json;
  });

  updateJson(tree, path.join(newProjectRoot, 'tsconfig.json'), (json: TsConfig) => {
    json.extends = json.extends?.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);
    json.references = json.references?.filter(ref => {
      return !ref.path.startsWith('./.storybook');
    });
    return json;
  });

  updateFileContent(tree, path.join(newProjectRoot, 'jest.config.js'), content => {
    const newContent = content.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);

    return newContent;
  });
}

function makeStoriesLibrary(tree: Tree, options: Options) {
  const newProjectRoot = path.join(options.projectConfig.root, 'stories');
  const newProjectSourceRoot = path.join(newProjectRoot, 'src');

  // move stories/
  moveFilesToNewDirectory(tree, path.join(options.projectConfig.root, 'stories'), newProjectSourceRoot);

  // move .storybook/
  moveFilesToNewDirectory(
    tree,
    path.join(options.projectConfig.root, '.storybook'),
    path.join(newProjectRoot, '.storybook'),
  );

  // TODO = probably having a generator to invoke here would be more efficient
  tree.write(path.join(newProjectSourceRoot, 'index.ts'), stripIndents`export {}`);
  tree.write(
    path.join(newProjectRoot, 'just.config.ts'),
    stripIndents`
      import { preset, task } from '@fluentui/scripts-tasks';

      preset();
  `,
  );

  const templates = {
    readme: stripIndents``,
    packageJson: {
      name: `${options.projectConfig.name}-stories`,
      version: '0.0.0',
      private: true,
      scripts: {
        start: 'yarn storybook',
        storybook: 'start-storybook',
        'type-check': 'just-scripts type-check',
      },
    },
    eslintrc: options.oldContent.eslintrc,
    tsconfig: {
      root: {
        ...options.oldContent.tsConfig,
        extends: joinPathFragments(options.projectOffsetFromRoot.updated, 'tsconfig.base.json'),
        references: [
          {
            path: './tsconfig.lib.json',
          },
          {
            path: './.storybook/tsconfig.json',
          },
        ],
      },
      lib: {
        extends: './tsconfig.json',
        compilerOptions: {
          lib: ['ES2019', 'dom'],
          outDir: joinPathFragments(options.projectOffsetFromRoot.updated, 'dist/out-tsc'),
          inlineSources: true,
          types: ['static-assets', 'environment'],
        },
        include: ['./src/**/*.ts', './src/**/*.tsx'],
      },
    },
  };

  tree.write(joinPathFragments(newProjectRoot, 'README.md'), templates.readme);
  writeJson(tree, joinPathFragments(newProjectRoot, '.eslintrc.json'), templates.eslintrc);
  writeJson(tree, joinPathFragments(newProjectRoot, 'tsconfig.json'), templates.tsconfig.root);
  writeJson(tree, joinPathFragments(newProjectRoot, 'tsconfig.lib.json'), templates.tsconfig.lib);
  writeJson(tree, joinPathFragments(newProjectRoot, 'package.json'), templates.packageJson);
  updateJson(tree, joinPathFragments(newProjectRoot, '.storybook/tsconfig.json'), (json: TsConfig) => {
    json.include = ['*.js'];
    return json;
  });
  updateFileContent(tree, joinPathFragments(newProjectRoot, '.storybook/main.js'), content => {
    content = content
      .replace(new RegExp('../stories/', 'g'), '../src/')
      .replace(new RegExp(options.projectOffsetFromRoot.old, 'g'), options.projectOffsetFromRoot.updated);

    return content;
  });
  updateFileContent(tree, joinPathFragments(newProjectRoot, '.storybook/preview.js'), content => {
    content = content.replace(
      new RegExp(options.projectOffsetFromRoot.old, 'g'),
      options.projectOffsetFromRoot.updated,
    );
    return content;
  });
  addProjectConfiguration(tree, `${options.projectConfig.name}-stories`, {
    ...options.projectConfig,
    root: newProjectRoot,
    sourceRoot: newProjectSourceRoot,
    name: `${options.projectConfig.name}-stories`,
    tags: ['vNext', 'platform:web', 'type:stories'],
  });

  // TODO - update all relative paths
}

function updateFileContent(tree: Tree, filePath: string, updater: (content: string) => string) {
  if (!tree.exists(filePath)) {
    return;
  }

  const content = tree.read(filePath, 'utf-8') ?? '';
  tree.write(filePath, updater(content));
}
