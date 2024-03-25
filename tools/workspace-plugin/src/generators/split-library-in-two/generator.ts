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
  getProjects,
  ProjectConfiguration,
  output,
} from '@nx/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';

import tsConfigBaseAllGenerator from '../tsconfig-base-all/index';
import { TsConfig } from '../../types';
import { workspacePaths } from '../../utils';
import { SplitLibraryInTwoGeneratorSchema } from './schema';

interface Options extends SplitLibraryInTwoGeneratorSchema {
  projectConfig: ReturnType<typeof readProjectConfiguration>;
  projectOffsetFromRoot: { old: string; updated: string };
  oldContent: {
    tsConfig: Record<string, unknown>;
  };
}

export async function splitLibraryInTwoGenerator(tree: Tree, options: SplitLibraryInTwoGeneratorSchema) {
  if (options.project && options.all) {
    throw new Error('Cannot specify both project and all');
  }

  if (options.all) {
    const projects = getProjects(tree);
    for (const [projectName] of projects) {
      splitLibraryInTwoInternal(tree, { projectName });
    }
  }
  if (options.project) {
    splitLibraryInTwoInternal(tree, { projectName: options.project });
  }

  await tsConfigBaseAllGenerator(tree, { verify: false });

  await formatFiles(tree);
}

function splitLibraryInTwoInternal(tree: Tree, options: { projectName: string }) {
  const projectConfig = readProjectConfiguration(tree, options.projectName);

  assertProject(tree, projectConfig);

  const normalizedOptions = {
    ...options,
    projectConfig,
    projectOffsetFromRoot: {
      old: offsetFromRoot(projectConfig.root),
      updated: offsetFromRoot(projectConfig.root) + '../',
    },
    oldContent: {
      tsConfig: readJson(tree, joinPathFragments(projectConfig.root, 'tsconfig.json')),
    },
  };

  cleanup(tree, normalizedOptions);

  makeSrcLibrary(tree, normalizedOptions);
  makeStoriesLibrary(tree, normalizedOptions);
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

  const storiesWorkspaceDeps = getWorkspaceDependencies(
    tree,
    Array.from(getImportsFromStories(tree, newProjectSourceRoot)),
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
        ...storiesWorkspaceDeps,
        // always added
        '@fluentui/react-storybook-addon': '*',
        '@fluentui/react-storybook-addon-export-to-sandbox': '*',
        '@fluentui/scripts-storybook': '*',
        '@fluentui/eslint-plugin': '*',
        '@fluentui/scripts-tasks': '*',
      },
    },
    justConfig: stripIndents`
      import { preset, task } from '@fluentui/scripts-tasks';

      preset();
  `,
    publicApi: stripIndents`export {}`,
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

  // TODO = probably having a generator to invoke here would be more efficient

  tree.write(joinPathFragments(newProjectRoot, 'README.md'), templates.readme);
  tree.write(joinPathFragments(newProjectSourceRoot, 'index.ts'), templates.publicApi);
  tree.write(joinPathFragments(newProjectRoot, 'just.config.ts'), templates.justConfig);
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
}

function assertProject(tree: Tree, projectConfig: ProjectConfiguration) {
  const tags = projectConfig.tags ?? [];

  if (projectConfig.projectType !== 'library') {
    output.warn({ title: 'This generator is only for libraries' });
    return;
  }

  if (projectConfig.name?.endsWith('-preview')) {
    output.warn({ title: 'preview projects are not supported YET, skipping...' });
    return;
  }

  if (tags.includes('compat')) {
    output.warn({ title: 'compat projects are not supported YET, skipping...' });
    return;
  }

  if (projectConfig.root?.endsWith('/stories') || projectConfig.root?.endsWith('/library')) {
    output.warn({ title: 'attempting to migrate already migrated projects, skipping...' });
    return;
  }

  const isV9Stable = tags.includes('vNext') && tags.includes('platform:web');

  if (!isV9Stable) {
    output.warn({ title: 'This generator is only for v9 stable web libraries' });
    return;
  }

  if (!tree.exists(joinPathFragments(projectConfig.root, 'stories'))) {
    output.warn({ title: '/stories directory does not exist within project, skipping...' });
    return;
  }
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

function getImportPaths(tree: Tree, filePath: string) {
  const fileContent = tree.read(filePath, 'utf8') ?? '';
  const ast = tsquery.ast(fileContent);

  const importNodes = tsquery.match(ast, 'ImportDeclaration') as import('typescript').ImportDeclaration[];
  const importPaths = importNodes.map(node => node.moduleSpecifier.getText().replace(/['"]/g, ''));

  const requireNodes = tsquery.match(
    ast,
    'CallExpression[expression.name="require"]',
  ) as import('typescript').CallExpression[];
  const requirePaths = requireNodes.map(node => (node.arguments[0] as import('typescript').StringLiteral).text);

  return [...importPaths, ...requirePaths];
}

function getImportsFromStories(tree: Tree, root: string) {
  const storiesDir = joinPathFragments(root);

  const imports: string[] = [];

  visitNotIgnoredFiles(tree, storiesDir, file => {
    if (!(file.endsWith('.stories.tsx') || file.endsWith('.stories.ts'))) {
      return;
    }

    const importPaths = getImportPaths(tree, file);
    imports.push(...importPaths);
  });

  return new Set(imports);
}

function getWorkspaceDependencies(tree: Tree, imports: string[]) {
  const allProjects = getProjects(tree);
  const dependencies: Record<string, string> = {};
  imports.forEach(importPath => {
    if (allProjects.has(importPath)) {
      dependencies[importPath] = '*';
    }
  });

  return dependencies;
}
