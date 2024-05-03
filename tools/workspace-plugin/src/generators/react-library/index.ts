import path from 'path';
import {
  Tree,
  formatFiles,
  installPackagesTask,
  names,
  generateFiles,
  offsetFromRoot,
  addProjectConfiguration,
  joinPathFragments,
  updateJson,
  readJson,
} from '@nx/devkit';

import { splitLibraryInTwoGenerator } from '../split-library-in-two/generator';

import { getProjectConfig, getWorkspaceConfig } from '../../utils';

import { ReactLibraryGeneratorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';
import tsConfigBaseAllGenerator from '../tsconfig-base-all';
import { addCodeowner } from '../add-codeowners';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: ReactLibraryGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  addFiles(tree, options);
  updatePackageJsonDependencies(tree, options);

  updateTsConfigBase(tree, options);
  await tsConfigBaseAllGenerator(tree, {});

  addCodeowner(tree, { packageName: options.projectConfig.name as string, owner: schema.owner });

  await splitLibraryInTwoGenerator(tree, { project: options.projectConfig.name, skipFormat: true });

  await formatFiles(tree);

  return () => {
    installPackagesTask(
      tree,
      // we need to always run it to properly link yarn workspaces with newly created package
      true,
    );
  };
}

function normalizeOptions(tree: Tree, options: ReactLibraryGeneratorSchema) {
  const npmScope = getWorkspaceConfig(tree).npmScope;
  const projectNameSuffix = options.kind === 'compat' ? '-compat' : '-preview';
  const projectName = '@' + npmScope + '/' + options.name + projectNameSuffix;
  const projectDirectory = options.name + projectNameSuffix;
  const root = joinPathFragments('packages', 'react-components', projectDirectory);
  const sourceRoot = joinPathFragments(root, 'src');

  addProjectConfiguration(tree, projectName, {
    root,
    projectType: 'library',
    sourceRoot,
    tags: ['platform:web', 'vNext', options.kind === 'compat' ? 'compat' : null].filter(Boolean) as string[],
    implicitDependencies: [],
  });

  const project = getProjectConfig(tree, { packageName: projectName });

  const nameVariations = { ...names(options.name), title: '' };
  nameVariations.title = nameVariations.fileName
    .split('-')
    .map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return {
    ...options,
    ...project,
    rootOffset: offsetFromRoot(root),
    ...nameVariations,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  options.className;
  const templateOptions = {
    ...options,
    tmpl: '',
    npmPackageName: options.projectConfig.name as string,
    packageName: options.normalizedPkgName,
  };

  generateFiles(tree, path.join(__dirname, 'files'), options.projectConfig.root, templateOptions);
}

function updatePackageJsonDependencies(tree: Tree, options: NormalizedSchema) {
  const rootPkgJson = readJson<PackageJson>(tree, options.paths.rootPackageJson);
  const rootPkgJsonDeps = { devDeps: rootPkgJson.devDependencies ?? {} };

  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    const deps = json.dependencies ?? {};
    const errors: string[] = [];
    Object.keys(deps).forEach(projectName => {
      try {
        const workspacePackage = getProjectConfig(tree, { packageName: projectName });
        const version = readJson<PackageJson>(tree, workspacePackage.paths.packageJson).version;
        deps[projectName] = '^' + version;
      } catch {
        const monorepoDepVersion = rootPkgJsonDeps.devDeps[projectName];
        if (!monorepoDepVersion) {
          errors.push(`- ${projectName}`);
          return;
        }
        deps[projectName] = '^' + monorepoDepVersion.replace(/[\^~]/, '');
      }
    });

    if (errors.length > 0) {
      throw new Error(
        `Following dependencies are not installed within your monorepo. You need to install them in root package.json as devDependencies:\n ${errors.join(
          '\n',
        )}`,
      );
    }

    json.dependencies = deps;
    return json;
  });
}

function updateTsConfigBase(tree: Tree, options: NormalizedSchema) {
  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};

    json.compilerOptions.paths[options.projectConfig.name as string] = [
      joinPathFragments(options.projectConfig.sourceRoot as string, 'index.ts'),
    ];
    return json;
  });

  return tree;
}
