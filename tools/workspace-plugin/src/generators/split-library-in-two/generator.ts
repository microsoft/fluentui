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
  installPackagesTask,
} from '@nx/devkit';
import * as path from 'node:path';
import { tsquery } from '@phenomnomnominal/tsquery';

import tsConfigBaseAllGenerator from '../tsconfig-base-all/index';
import { TsConfig } from '../../types';
import { workspacePaths } from '../../utils';
import { SplitLibraryInTwoGeneratorSchema } from './schema';

export { isSplitProject, assertStoriesProject } from './shared';

type CLIOutput = typeof output;

interface Options extends SplitLibraryInTwoGeneratorSchema {
  projectConfig: ReturnType<typeof readProjectConfiguration>;
  projectOffsetFromRoot: { old: string; updated: string };
  oldContent: {
    tsConfig: Record<string, unknown>;
    packageJSON: Record<string, unknown>;
  };

  oldPackageMetadata: {
    ssrTestsScript: string | undefined;
  };
}

const noop = () => {
  return;
};

function createOutputLogger(options: SplitLibraryInTwoGeneratorSchema): CLIOutput {
  if (options.logs) {
    return output;
  }

  return {
    log: noop,
    note: noop,
    warn: noop,
    error: noop,
  } as unknown as CLIOutput;
}

export async function splitLibraryInTwoGenerator(tree: Tree, options: SplitLibraryInTwoGeneratorSchema) {
  if (options.project && options.all) {
    throw new Error('Cannot specify both project and all');
  }
  if (!(options.project || options.all)) {
    throw new Error('missing `project` or `all` option');
  }

  const cliOutput = createOutputLogger(options);

  if (options.all) {
    const projects = getProjects(tree);
    const projectsToSplit = Array.from(projects).filter(([_, project]) =>
      assertProject(tree, project, { warn: noop } as unknown as CLIOutput),
    );

    cliOutput.log({
      title: `Splitting ${projectsToSplit.length} libraries in two...`,
      bodyLines: projectsToSplit.map(([name]) => name),
    });

    for (const [projectName, project] of projectsToSplit) {
      splitLibraryInTwoInternal(tree, { projectName, project }, cliOutput);
    }
  }

  if (options.project) {
    splitLibraryInTwoInternal(tree, { projectName: options.project }, cliOutput);
  }

  await tsConfigBaseAllGenerator(tree, { verify: false, skipFormat: true });

  // TODO: we don't wanna fail master build because formatting failed
  // - Nx is using await `prettier.format` under the hood which is for prettier v3, but we use prettier v2 ATM, while that unnecessary await should not cause harm it seems it does
  try {
    if (!options.skipFormat) {
      await formatFiles(tree);
    }
  } catch (err) {
    console.log(err);
  }

  return () => {
    installPackagesTask(tree, true);
  };
}

function splitLibraryInTwoInternal(
  tree: Tree,
  options: { projectName: string; project?: ProjectConfiguration },
  logger: CLIOutput,
) {
  const { projectName, project } = options;
  const projectConfig = project ?? readProjectConfiguration(tree, options.projectName);

  logger.log({ title: `Splitting library in two: ${projectConfig.name}`, color: 'magenta' });

  if (!assertProject(tree, projectConfig, logger)) {
    return;
  }

  const packageJSON = readJson(tree, joinPathFragments(projectConfig.root, 'package.json'));
  const normalizedOptions = {
    projectName,
    projectConfig,
    projectOffsetFromRoot: {
      old: offsetFromRoot(projectConfig.root),
      updated: offsetFromRoot(projectConfig.root) + '../',
    },
    oldContent: {
      tsConfig: readJson(tree, joinPathFragments(projectConfig.root, 'tsconfig.json')),
      packageJSON,
    },
    oldPackageMetadata: {
      ssrTestsScript: packageJSON?.scripts?.['test-ssr'],
    },
  };

  cleanup(tree, normalizedOptions, logger);

  makeSrcLibrary(tree, normalizedOptions, logger);
  makeStoriesLibrary(tree, normalizedOptions, logger);
}

export default splitLibraryInTwoGenerator;

function cleanup(tree: Tree, options: Options, logger: CLIOutput) {
  logger.log({ title: 'Cleaning up build assets...' });
  const oldProjectRoot = options.projectConfig.root;
  tree.delete(joinPathFragments(oldProjectRoot, 'dist'));
  tree.delete(joinPathFragments(oldProjectRoot, 'lib'));
  tree.delete(joinPathFragments(oldProjectRoot, 'lib-commonjs'));
  tree.delete(joinPathFragments(oldProjectRoot, 'temp'));
  tree.delete(joinPathFragments(oldProjectRoot, '.eslintcache'));
  tree.delete(joinPathFragments(oldProjectRoot, '.swc'));
  tree.delete(joinPathFragments(oldProjectRoot, 'node_modules'));
}

function makeSrcLibrary(tree: Tree, options: Options, logger: CLIOutput) {
  logger.log({ title: 'creating library/ project' });

  const oldProjectRoot = options.projectConfig.root;
  const newProjectRoot = joinPathFragments(oldProjectRoot, 'library');
  const newProjectSourceRoot = joinPathFragments(newProjectRoot, 'src');

  visitNotIgnoredFiles(tree, oldProjectRoot, file => {
    if (file.includes('/stories/') || file.includes('/.storybook/')) {
      return;
    }

    const newFileName = `${newProjectRoot}/${path.relative(oldProjectRoot, file)}`;

    tree.rename(file, newFileName);
  });

  updateProjectConfiguration(tree, options.projectConfig.name!, {
    ...options.projectConfig,
    // @ts-expect-error - nx doesn't type $schema prop
    $schema: joinPathFragments(options.projectOffsetFromRoot.updated, 'node_modules/nx/schemas/project-schema.json'),
    root: newProjectRoot,
    sourceRoot: newProjectSourceRoot,
  });

  const filePaths = {
    pkgJson: joinPathFragments(newProjectRoot, 'package.json'),
    tsConfig: joinPathFragments(newProjectRoot, 'tsconfig.json'),
    tsConfigLib: joinPathFragments(newProjectRoot, 'tsconfig.lib.json'),
    babelRc: joinPathFragments(newProjectRoot, '.babelrc.json'),
    apiExtractorConfig: joinPathFragments(newProjectRoot, 'config/api-extractor.json'),
    jestConfig: joinPathFragments(newProjectRoot, 'jest.config.js'),
    rootTsConfig: '/tsconfig.base.json',
  };

  updateJson(tree, filePaths.pkgJson, json => {
    json.scripts ??= {};
    json.scripts.storybook = 'yarn --cwd ../stories storybook';
    json.scripts['type-check'] = 'just-scripts type-check';
    delete json.scripts['test-ssr'];

    const deps = getMissingDevDependenciesFromCypressAndJestFiles(
      tree,
      {
        sourceRoot: newProjectSourceRoot,
        projectName: options.projectConfig.name!,
        dependencies: json.dependencies,
      },
      logger,
    );

    json.devDependencies ??= {};
    json.devDependencies = { ...deps, ...json.devDependencies };

    return json;
  });

  updateJson(tree, filePaths.tsConfig, (json: TsConfig) => {
    json.extends = json.extends?.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);
    json.references = json.references?.filter(ref => {
      return !ref.path.startsWith('./.storybook');
    });
    return json;
  });
  updateJson(tree, filePaths.tsConfigLib, (json: TsConfig) => {
    json.compilerOptions.declarationDir = json.compilerOptions.declarationDir?.replace(
      options.projectOffsetFromRoot.old,
      options.projectOffsetFromRoot.updated,
    );
    json.compilerOptions.outDir = json.compilerOptions.outDir?.replace(
      options.projectOffsetFromRoot.old,
      options.projectOffsetFromRoot.updated,
    );

    return json;
  });

  if (tree.exists(filePaths.babelRc)) {
    updateJson(tree, filePaths.babelRc, json => {
      json.extends = json.extends?.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);

      return json;
    });
  }

  if (tree.exists(filePaths.apiExtractorConfig)) {
    updateJson(tree, filePaths.apiExtractorConfig, json => {
      json.mainEntryPointFilePath = `<projectRoot>/${offsetFromRoot(
        filePaths.apiExtractorConfig,
      )}dist/out-tsc/types/packages/react-components/<unscopedPackageName>/library/src/index.d.ts`;

      return json;
    });
  }

  updateFileContent(tree, filePaths.jestConfig, content => {
    const newContent = content.replace(options.projectOffsetFromRoot.old, options.projectOffsetFromRoot.updated);

    return newContent;
  });

  updateJson(tree, filePaths.rootTsConfig, (json: TsConfig) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[options.projectConfig.name!] = [`${newProjectSourceRoot}/index.ts`];
    return json;
  });

  updateCodeowners(tree, options);
}

function makeStoriesLibrary(tree: Tree, options: Options, logger: CLIOutput) {
  logger.log({ title: 'creating stories/ project' });
  const oldProjectRoot = options.projectConfig.root;
  const newProjectRoot = joinPathFragments(oldProjectRoot, 'stories');
  const newProjectSourceRoot = joinPathFragments(newProjectRoot, 'src');
  const newProjectName = `${options.projectConfig.name}-stories`;

  // move stories/
  moveFilesToNewDirectory(tree, joinPathFragments(oldProjectRoot, 'stories'), newProjectSourceRoot);

  // move .storybook/
  moveFilesToNewDirectory(
    tree,
    joinPathFragments(oldProjectRoot, '.storybook'),
    joinPathFragments(newProjectRoot, '.storybook'),
  );

  const storiesWorkspaceDeps = getWorkspaceDependencies(
    tree,
    Array.from(
      getImportsFromSourceFiles(
        tree,
        newProjectSourceRoot,
        file => file.endsWith('.stories.tsx') || file.endsWith('.stories.ts'),
      ),
    ),
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
        lint: 'eslint src/',
        format: 'just-scripts prettier',
        ...(options.oldPackageMetadata.ssrTestsScript ? { 'test-ssr': `test-ssr "./src/**/*.stories.tsx"` } : null),
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
      rules: {
        'import/no-extraneous-dependencies': ['error', { packageDir: ['.', options.projectOffsetFromRoot.updated] }],
      },
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
    tags: [
      'vNext',
      'platform:web',
      options.projectConfig.tags?.includes('compat') ? 'compat' : null,
      'type:stories',
    ].filter(Boolean) as string[],
  });

  updateJson(tree, '/tsconfig.base.json', (json: TsConfig) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[newProjectName] = [`${newProjectSourceRoot}/index.ts`];
    return json;
  });
}

function assertProject(tree: Tree, projectConfig: ProjectConfiguration, logger: Pick<CLIOutput, 'warn'>) {
  const tags = projectConfig.tags ?? [];

  if (projectConfig.projectType !== 'library') {
    logger.warn({ title: 'This generator is only for libraries' });
    return;
  }

  if (projectConfig.root?.endsWith('/stories') || projectConfig.root?.endsWith('/library')) {
    logger.warn({ title: 'attempting to migrate already migrated projects, skipping...' });
    return;
  }

  const isV9Stable =
    tags.includes('vNext') &&
    tags.includes('platform:web') &&
    !(tags.includes('v8') || tags.includes('react-northstar'));

  if (!isV9Stable) {
    logger.warn({ title: 'This generator is only for v9 stable web libraries' });
    return;
  }

  if (!tree.exists(joinPathFragments(projectConfig.root, 'stories'))) {
    logger.warn({ title: '/stories directory does not exist within project, skipping...' });
    return;
  }

  return true;
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

function getImportsFromSourceFiles(tree: Tree, root: string, filter: (file: string) => boolean) {
  const imports: string[] = [];

  visitNotIgnoredFiles(tree, root, file => {
    if (!filter(file)) {
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

function getMissingDevDependenciesFromCypressAndJestFiles(
  tree: Tree,
  options: { sourceRoot: string; projectName: string; dependencies: Record<string, string> },
  logger: CLIOutput,
) {
  const { projectName, sourceRoot, dependencies } = options;

  const cypressWorkspaceDeps = getWorkspaceDependencies(
    tree,
    Array.from(
      getImportsFromSourceFiles(tree, sourceRoot, file => file.endsWith('.cy.tsx') || file.endsWith('.cy.ts')),
    ),
  );

  const jestWorkspaceDeps = getWorkspaceDependencies(
    tree,
    Array.from(
      getImportsFromSourceFiles(
        tree,
        sourceRoot,
        file =>
          file.endsWith('.test.tsx') ||
          file.endsWith('.test.ts') ||
          file.endsWith('.spec.tsx') ||
          file.endsWith('.spec.ts'),
      ),
    ),
  );

  const deps = { ...cypressWorkspaceDeps, ...jestWorkspaceDeps };

  if (deps[projectName]) {
    // don't add self to deps
    delete deps[projectName];

    logger.warn({
      title: 'Not adding self to dependencies',
      bodyLines: ['You should not import from you package absolute path within test files. Prefer relative imports.'],
    });
  }

  if (dependencies) {
    const log: string[] = [];

    Object.keys(dependencies).forEach(dep => {
      if (deps[dep]) {
        delete deps[dep];
        log.push(dep);
      }
    });

    if (log.length > 0) {
      logger.warn({
        title: 'Not adding dependencies that are already present in package.json',
        bodyLines: log,
      });
    }
  }

  if (deps['@fluentui/react-components']) {
    logger.error({
      title: 'react-components cannot be used within cypress or jest test files as it creates circular dependency.',
      bodyLines: [
        'Please remove/replace problematic imports from the test files and remove the dependency from "package.json#devDependencies".',
      ],
    });
  }

  logger.log({ title: 'Adding missing dependencies', bodyLines: Object.keys(deps) });

  return deps;
}
