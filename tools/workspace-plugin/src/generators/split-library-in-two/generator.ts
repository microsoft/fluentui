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

import tsConfigBaseAllGenerator from '../tsconfig-base-all/index';
import { TsConfig } from '../../types';
import { workspacePaths } from '../../utils';
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

  const eslintRcPath = joinPathFragments(projectConfig.root, '.eslintrc.json');

  const normalizedOptions = {
    ...options,
    projectConfig,
    projectOffsetFromRoot: {
      old: offsetFromRoot(projectConfig.root),
      updated: offsetFromRoot(projectConfig.root) + '../',
    },
    oldContent: {
      eslintrc: tree.exists(eslintRcPath) ? readJson(tree, eslintRcPath) : {},
      tsConfig: readJson(tree, joinPathFragments(projectConfig.root, 'tsconfig.json')),
    },
  };

  cleanup(tree, normalizedOptions);

  makeSrcLibrary(tree, normalizedOptions);
  makeStoriesLibrary(tree, normalizedOptions);

  await tsConfigBaseAllGenerator(tree, { verify: false });

  await formatFiles(tree);
}

export default splitLibraryInTwoGenerator;

function cleanup(tree: Tree, options: Options) {
  tree.delete(joinPathFragments(options.projectConfig.root, 'dist'));
  tree.delete(joinPathFragments(options.projectConfig.root, 'lib'));
  tree.delete(joinPathFragments(options.projectConfig.root, 'lib-commonjs'));
  tree.delete(joinPathFragments(options.projectConfig.root, 'temp'));
  tree.delete(joinPathFragments(options.projectConfig.root, '.eslintcache'));
  tree.delete(joinPathFragments(options.projectConfig.root, '.swc'));
  tree.delete(joinPathFragments(options.projectConfig.root, 'node_modules'));
}

function makeSrcLibrary(tree: Tree, options: Options) {
  const newProjectRoot = joinPathFragments(options.projectConfig.root, 'library');
  const newProjectSourceRoot = joinPathFragments(newProjectRoot, 'src');

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

  updateJson(tree, joinPathFragments(newProjectRoot, 'package.json'), json => {
    json.scripts ??= {};
    json.scripts.storybook = 'yarn --cwd ../stories storybook';
    json.scripts['type-check'] = 'just-scripts type-check';
    return json;
  });

  updateJson(tree, joinPathFragments(newProjectRoot, 'tsconfig.json'), (json: TsConfig) => {
    json.extends = json.extends?.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);
    json.references = json.references?.filter(ref => {
      return !ref.path.startsWith('./.storybook');
    });
    return json;
  });

  updateFileContent(tree, joinPathFragments(newProjectRoot, 'jest.config.js'), content => {
    const newContent = content.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);

    return newContent;
  });

  updateJson(tree, '/tsconfig.base.json', (json: TsConfig) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[options.projectConfig.name!] = [`${newProjectSourceRoot}/index.ts`];
    return json;
  });

  updateCodeowners(tree, options);
}

function makeStoriesLibrary(tree: Tree, options: Options) {
  const newProjectRoot = joinPathFragments(options.projectConfig.root, 'stories');
  const newProjectSourceRoot = joinPathFragments(newProjectRoot, 'src');
  const newProjectName = `${options.projectConfig.name}-stories`;

  // move stories/
  moveFilesToNewDirectory(tree, joinPathFragments(options.projectConfig.root, 'stories'), newProjectSourceRoot);

  // move .storybook/
  moveFilesToNewDirectory(
    tree,
    joinPathFragments(options.projectConfig.root, '.storybook'),
    joinPathFragments(newProjectRoot, '.storybook'),
  );

  // TODO = probably having a generator to invoke here would be more efficient
  tree.write(joinPathFragments(newProjectSourceRoot, 'index.ts'), stripIndents`export {}`);
  tree.write(
    joinPathFragments(newProjectRoot, 'just.config.ts'),
    stripIndents`
      import { preset, task } from '@fluentui/scripts-tasks';

      preset();
  `,
  );

  const templates = {
    readme: stripIndents`
      # ${newProjectName}

      Storybook stories for ${options.projectConfig.root}

      ## Usage

      To include within storybook specify stories globs:

      \`\`\`js
      module.exports = {
        stories: ['../${newProjectSourceRoot}/**/*.stories.mdx', '../${newProjectSourceRoot}/**/index.stories.@(ts|tsx)'],
      }
      \`\`\`

      ## API

      no public API available
    `,
    packageJson: {
      name: newProjectName,
      version: '0.0.0',
      private: true,
      scripts: {
        start: 'yarn storybook',
        storybook: 'start-storybook',
        'type-check': 'just-scripts type-check',
        'test-ssr': 'test-ssr "./src/**/*.stories.tsx"',
        lint: 'just-scripts lint',
        format: 'just-scripts prettier',
      },
      devDependencies: {
        // TODO: parse AST to get proper version of deps needed
        '@fluentui/react-components': '*',
        '@fluentui/react-icons': '^2.0.224',
        // always added
        '@fluentui/react-storybook-addon': '*',
        '@fluentui/react-storybook-addon-export-to-sandbox': '*',
        '@fluentui/scripts-storybook': '*',
        '@fluentui/eslint-plugin': '*',
        '@fluentui/scripts-tasks': '*',
      },
    },
    eslintrc: {
      extends: ['plugin:@fluentui/eslint-plugin/react'],
      root: true,
    },
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

  updateJson(tree, '/tsconfig.base.json', (json: TsConfig) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[newProjectName] = [`${newProjectSourceRoot}/index.ts`];
    return json;
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

function updateCodeowners(tree: Tree, options: Options) {
  const codeownersPath = workspacePaths.github.codeowners;

  const content = tree.read(codeownersPath, 'utf-8') ?? '';

  const lines = content.split('\n');
  const lineIndex = lines.findIndex(line => line.includes(options.projectConfig.root));

  if (lineIndex !== -1) {
    const currentLine = lines[lineIndex];
    const updatedLine = currentLine.replace(options.projectConfig.root, `${options.projectConfig.root}/library`);
    const newLine = currentLine.replace(options.projectConfig.root, `${options.projectConfig.root}/stories`);

    lines.splice(lineIndex, 1, updatedLine, newLine);

    const newContent = lines.join('\n');

    tree.write(codeownersPath, newContent);
  }
}
