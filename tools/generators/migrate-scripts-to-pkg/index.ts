/* eslint-disable import/no-extraneous-dependencies */
import {
  Tree,
  formatFiles,
  addProjectConfiguration,
  writeJson,
  joinPathFragments,
  offsetFromRoot,
  readJson,
  stripIndents,
  updateJson,
  visitNotIgnoredFiles,
  applyChangesToString,
  ChangeType,
  StringChange,
  removeProjectConfiguration,
} from '@nrwl/devkit';
import * as path from 'path';

import { MigrateScriptsToPkgGeneratorSchema } from './schema';
import { TsConfig } from '../../types';
import { findUpTree } from './lib/utils';

interface PackageOptions {
  root: string;
  sourceRoot?: string;
  sourceRootFile?: string;
  name: string;
  dependencies?: Record<string, string>;
}

export default async function (tree: Tree, _schema: MigrateScriptsToPkgGeneratorSchema) {
  updateJson(tree, `/package.json`, json => {
    (json.workspaces.packages as string[])[4] = 'scripts/*';
    return json;
  });
  updateJson(tree, `/lerna.json`, json => {
    (json.packages as string[])[3] = 'scripts/*';
    return json;
  });

  tree.delete('/scripts/node_modules');
  tree
    .children('/scripts')
    .map(childName => joinPathFragments('scripts', childName))
    .filter(childPath => tree.isFile(childPath))
    .forEach(filePath => {
      tree.delete(filePath);
    });

  const folders = tree.children('/scripts');

  // migrate /scripts
  folders.forEach(folderName => {
    const folderPath = `scripts/${folderName}`;
    const projectName = `@fluentui/scripts-${folderName}`;
    const options = { root: folderPath, name: projectName };

    const { dependencies } = createBetweenScriptsDependencies(tree, { ...options, folders });

    const metadata = createSourceRoot(tree, options);
    const extendedOptions = { ...options, dependencies, ...(metadata ? { ...metadata } : null) };

    createPackageJson(tree, extendedOptions);
    createTsConfig(tree, extendedOptions);
    createJestConfig(tree, extendedOptions);
    createLintConfig(tree, extendedOptions);
    addProjectConfiguration(tree, projectName, {
      root: options.root,
      sourceRoot: extendedOptions.sourceRoot ?? options.root,
      projectType: 'library',
      tags: ['tools'],
    });
  });

  migrateWholeMonorepo(tree);
  removeProjectConfiguration(tree, '@fluentui/scripts');

  // console.log({ packagesMap: JSON.stringify(packagesMap, null, 2) });

  // await libraryGenerator(tree, { name: 'foo-bar' });

  // const normalizedOptions = normalizeOptions(tree, { ...schema, name: 'foo-bar' });

  // addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    // installPackagesTask(tree);
  };
}

function migrateWholeMonorepo(tree: Tree) {
  const ignoredFiles = /.+\.(yml|md)$/;
  const ignoredFolders = /^(scripts|tools|typings|.git).+/;
  const filesWithoutExtension = /.+\.[a-z]+$/;
  const usesScripts = /['"]@fluentui\/scripts\/[a-z-/.]+['"]/;
  const scriptsImportRegexToReplace = /@fluentui\/scripts\/[a-z-]+/g;
  const packagesMap: { [packageJsonPath: string]: string[] } = {};

  visitNotIgnoredFiles(tree, '/', filePath => {
    if (!filesWithoutExtension.test(filePath)) {
      return;
    }
    if (ignoredFolders.test(filePath)) {
      return;
    }
    if (ignoredFiles.test(filePath)) {
      return;
    }
    // special json files that we need to process
    if (filePath.endsWith('.json')) {
      if (filePath.endsWith('/package.json')) {
        updateJson(tree, filePath, json => {
          if (json.devDependencies) {
            delete json.devDependencies['@fluentui/scripts'];

            if (tree.exists(joinPathFragments(path.dirname(filePath), 'gulpfile.ts'))) {
              json.devDependencies['@fluentui/scripts-gulp'] = '*';
            }
          }
          return json;
        });

        return;
      }
      if (!filePath.includes('api-extractor.json')) {
        return;
      }
    }

    const content = tree.read(filePath, 'utf-8') as string;

    if (usesScripts.test(content)) {
      const packageJsonPath = findUpTree(tree, 'package.json', filePath);

      // we don't wanna add local devDeps to monorepo package.json root
      if (packageJsonPath) {
        packagesMap[packageJsonPath] = packagesMap[packageJsonPath] ?? [];
      }

      const newContent = content.replace(scriptsImportRegexToReplace, match => {
        const newPackagePath = match.replace('scripts/', 'scripts-');
        if (packageJsonPath) {
          packagesMap[packageJsonPath].push(newPackagePath);
        }
        return newPackagePath;
      });

      tree.write(filePath, newContent);
    }
  });

  // Update package.json devDeps
  Object.entries(packagesMap).forEach(([packageJsonPath, scriptDependencies]) => {
    const devDepsObj = scriptDependencies.reduce((acc, curr) => {
      acc[curr] = '*';
      return acc;
    }, {} as Record<string, string>);

    updateJson(tree, packageJsonPath, json => {
      json.devDependencies = json.devDependencies ?? {};
      delete json.devDependencies['@fluentui/scripts'];
      Object.assign(json.devDependencies, devDepsObj);
      return json;
    });
  });
}

function createBetweenScriptsDependencies(tree: Tree, options: PackageOptions & { folders: string[] }) {
  const tsImportRegex = /import.+from\s+'([@./a-z-_]+)';/g;
  const jsImportRegex = /require\('([@./a-z-_]+)'\);/g;

  const importMaps: {
    [filePath: string]: {
      content: string;
      changes: Array<{
        currentImportPath: string;
        newImportPath: string;
        startIndex: number;
        endIndex: number;
      }>;
    };
  } = {};
  const dependencies: Record<string, string> = {};

  visitNotIgnoredFiles(tree, options.root, filePath => {
    if (!(filePath.endsWith('.js') || filePath.endsWith('.ts'))) {
      return;
    }
    if (filePath.includes('.spec.')) {
      return;
    }

    const content = tree.read(filePath, 'utf-8') as string;

    const tsImports: Array<{ path: string; start: number; end: number }> = [];
    const jsImports: Array<{ path: string; start: number; end: number }> = [];
    let tsMatchArr: RegExpExecArray | null;
    let jsMatchArr: RegExpExecArray | null;

    while ((tsMatchArr = tsImportRegex.exec(content)) !== null) {
      const lastIndex = tsImportRegex.lastIndex;

      tsImports.push({
        path: tsMatchArr[1],
        start: lastIndex - 2 - tsMatchArr[1].length,
        end: lastIndex,
      });
    }

    while ((jsMatchArr = jsImportRegex.exec(content)) !== null) {
      const lastIndex = jsImportRegex.lastIndex;
      jsImports.push({
        path: jsMatchArr[1],
        start: lastIndex - 3 - jsMatchArr[1].length,
        end: lastIndex,
      });
    }

    const imports = [...tsImports, ...jsImports].filter(Boolean);

    imports.forEach(importPath => {
      if (!importPath.path.startsWith('../')) {
        return;
      }

      const scriptsPotentialPackageFolder = path.basename(path.resolve(filePath, importPath.path));
      const scriptsPackageFolder = options.folders.find(folder => folder === scriptsPotentialPackageFolder);

      if (!scriptsPackageFolder) {
        return;
      }

      importMaps[filePath] = importMaps[filePath] ? importMaps[filePath] : { content, changes: [] };
      importMaps[filePath].changes.push({
        startIndex: importPath.start,
        endIndex: importPath.end,
        currentImportPath: importPath.path,
        newImportPath: `@fluentui/scripts-${scriptsPackageFolder}`,
      });
    });
  });

  Object.entries(importMaps).forEach(([filePath, data]) => {
    const applyChanges = data.changes
      .map(change => {
        dependencies[change.newImportPath] = '*';

        return [
          {
            type: ChangeType.Insert,
            index: change.startIndex,
            text: change.newImportPath,
          },
          {
            type: ChangeType.Delete,
            start: change.startIndex,
            length: change.currentImportPath.length,
          },
        ] as StringChange[];
      })
      .flat();

    const updatedCode = applyChangesToString(data.content, applyChanges);

    // logger.info(`Updating: ${filePath} ===>`);

    tree.write(filePath, updatedCode);
  });

  return { dependencies };
}

function createSourceRoot(tree: Tree, options: PackageOptions) {
  const indexFile = getIndexFile();

  if (!indexFile) {
    return null;
  }

  if (!isBarrelApi(indexFile.content)) {
    return null;
  }

  // move implementation files to /src folder
  visitNotIgnoredFiles(tree, options.root, filePath => {
    if (['tsconfig.json', 'README.md'].includes(path.basename(filePath))) {
      return;
    }

    tree.rename(filePath, `${options.root}/src/${path.relative(options.root, filePath)}`);
  });

  return {
    sourceRoot: `${options.root}/src`,
    sourceRootFile: `src/${indexFile.indexFile}`,
  };

  function isBarrelApi(content: string) {
    if (tree.exists(joinPathFragments(options.root, 'register.js'))) {
      return false;
    }
    if (content.includes(`export {}`)) {
      return false;
    }
    if (!(content.includes(`export`) || content.includes(`module.exports`))) {
      return false;
    }
    return true;
  }

  function getIndexFile() {
    const paths = { js: joinPathFragments(options.root, 'index.js'), ts: joinPathFragments(options.root, 'index.ts') };
    if (tree.exists(paths.js)) {
      return {
        content: tree.read(paths.js, 'utf-8') as string,
        indexFile: 'index.js',
      };
    }
    if (tree.exists(paths.ts)) {
      return {
        content: tree.read(paths.ts, 'utf-8') as string,
        indexFile: 'index.ts',
      };
    }
    return null;
  }
}

function createTsConfig(tree: Tree, options: PackageOptions) {
  const sourceRootRelativePath = options.sourceRootFile ? `./src` : '.';
  const tsconfigPaths = {
    main: `${options.root}/tsconfig.json`,
    spec: `${options.root}/tsconfig.spec.json`,
    lib: `${options.root}/tsconfig.lib.json`,
  };

  const currentTsConfig = readJson<TsConfig>(tree, tsconfigPaths.main);

  const template = {
    main: {
      extends: '@tsconfig/node14/tsconfig.json',
      compilerOptions: {
        target: 'ES2019',
        pretty: true,
        noEmit: true,
        allowJs: true,
        checkJs: true,
        sourceMap: true,
        noUnusedLocals: true,
      } as TsConfig['compilerOptions'],
      include: [],
      files: [],
      references: [
        {
          path: './tsconfig.lib.json',
        },
        {
          path: './tsconfig.spec.json',
        },
      ],
    },
    spec: {
      extends: './tsconfig.json',
      compilerOptions: {
        module: 'CommonJS',
        outDir: 'dist',
        types: ['jest', 'node'],
      } as TsConfig['compilerOptions'],
      include: ['**/*.spec.ts', '**/*.test.ts', '**/*.d.ts'],
    },
    lib: {
      extends: './tsconfig.json',
      compilerOptions: {
        noEmit: false,
        lib: ['ES2019'],
        outDir: offsetFromRoot(options.root) + 'dist/out-tsc',
        types: currentTsConfig.compilerOptions.types,
      } as TsConfig['compilerOptions'],
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
      include: [`${sourceRootRelativePath}/**/*.ts`, `${sourceRootRelativePath}/**/*.js`],
      ...(currentTsConfig.files ? { files: currentTsConfig.files } : null),
    },
  };

  writeJson(tree, tsconfigPaths.main, template.main);
  writeJson(tree, tsconfigPaths.lib, template.lib);
  writeJson(tree, tsconfigPaths.spec, template.spec);

  return tree;
}
function createJestConfig(tree: Tree, options: PackageOptions) {
  const jestConfigPath = `${options.root}/jest.config.js`;
  const template = stripIndents`
// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: '${options.name.replace('@fluentui/', '')}',
  preset: '${offsetFromRoot(options.root)}jest.preset.js',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
  `;

  tree.write(jestConfigPath, template);
  return tree;
}
function createLintConfig(tree: Tree, options: PackageOptions) {
  const eslintJsonPath = `${options.root}/.eslintrc.json`;
  const template = {
    extends: ['plugin:@fluentui/eslint-plugin/node', 'plugin:@fluentui/eslint-plugin/imports'],
    rules: {
      '@fluentui/max-len': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['.', offsetFromRoot(options.root)],
        },
      ],
    },
    overrides: [
      { files: `${options.sourceRootFile ? 'src/' : ''}index.d.ts`, rules: { 'import/no-self-import': 'off' } },
    ],
    root: true,
  };

  writeJson(tree, eslintJsonPath, template);
  return tree;
}
function createPackageJson(tree: Tree, options: PackageOptions) {
  const pkgJsonPath = `${options.root}/package.json`;
  const template = {
    name: options.name,
    version: '0.0.1',
    private: true,
    main: options.sourceRootFile ?? 'index.js',
    scripts: {
      format: `prettier -w --ignore-path ${offsetFromRoot(options.root)}.prettierignore .`,
      'format:check': `yarn format -c`,
      lint: 'eslint --ext .ts,.js .',
      test: 'jest --passWithNoTests',
      'type-check': 'tsc -b tsconfig.json',
    },
    dependencies: { ...options.dependencies },
  };

  writeJson(tree, pkgJsonPath, template);
  return tree;
}
