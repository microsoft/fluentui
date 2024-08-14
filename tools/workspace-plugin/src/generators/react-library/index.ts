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
  getProjects,
} from '@nx/devkit';

import { splitLibraryInTwoGenerator } from '../split-library-in-two/generator';

import { getProjectConfig } from '../../utils';

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
  const projectNameSuffix = options.kind === 'compat' ? '-compat' : '-preview';
  const projectName = options.name + projectNameSuffix;
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
    projectName,
    ...nameVariations,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    tmpl: '',
    projectName: options.projectConfig.name,
    npmScope: options.workspaceConfig.npmScope,
  };

  generateFiles(tree, path.join(__dirname, 'files'), options.projectConfig.root, templateOptions);
}

function updatePackageJsonDependencies(tree: Tree, options: NormalizedSchema) {
  const rootPkgJson = readJson<PackageJson>(tree, options.paths.rootPackageJson);
  const rootPkgJsonDeps = { devDeps: rootPkgJson.devDependencies ?? {} };
  const allProjects = getProjects(tree);

  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    const deps = json.dependencies ?? {};
    const errors: string[] = [];

    Object.keys(deps).forEach(npmPackageName => {
      try {
        const workspaceProjectName = npmPackageName.replace(`@${options.workspaceConfig.npmScope}/`, '');
        const workspacePackage = allProjects.get(workspaceProjectName);
        if (!workspacePackage) {
          throw new Error(`Package '${workspaceProjectName}' not found in workspace`);
        }
        const workspacePackageJson = readJson<PackageJson>(
          tree,
          joinPathFragments(workspacePackage?.root, 'package.json'),
        );
        const versionRange = '^' + workspacePackageJson.version;

        deps[npmPackageName] = versionRange;
      } catch {
        const monorepoDepVersion = rootPkgJsonDeps.devDeps[npmPackageName];
        if (!monorepoDepVersion) {
          errors.push(`- ${npmPackageName}`);
          return;
        }
        deps[npmPackageName] = '^' + monorepoDepVersion.replace(/[\^~]/, '');
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
  const npmName = `@${options.workspaceConfig.npmScope}/${options.projectConfig.name}`;

  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};

    json.compilerOptions.paths[npmName] = [joinPathFragments(options.projectConfig.sourceRoot as string, 'index.ts')];
    return json;
  });

  return tree;
}
