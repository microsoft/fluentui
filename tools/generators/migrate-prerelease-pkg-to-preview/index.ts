import {
  Tree,
  formatFiles,
  names,
  updateJson,
  updateProjectConfiguration,
  joinPathFragments,
  visitNotIgnoredFiles,
  createProjectGraphAsync,
  reverse,
  stripIndents,
  readJson,
  logger,
} from '@nrwl/devkit';

import * as semver from 'semver';

import tsConfigBaseAllGenerator from '../tsconfig-base-all';

import { getProjectConfig, isPackageConverged } from '../../utils';

import { MigratePrereleasePkgToPreviewGeneratorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigratePrereleasePkgToPreviewGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  checkProject(tree, options);
  await checkDependencies(tree, options);

  updateProject(tree, options);

  await tsConfigBaseAllGenerator(tree, {});

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, options: MigratePrereleasePkgToPreviewGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.project });

  return {
    ...options,
    ...project,
    ...names(options.project),
    migrated: {
      projectName: `${project.projectConfig.name}-preview`,
      projectRootPath: project.projectConfig.root.replace(
        project.normalizedPkgName,
        `${project.normalizedPkgName}-preview`,
      ),
      projectSourceRootPath: project.projectConfig.sourceRoot?.replace(
        `/${project.normalizedPkgName}/`,
        `/${project.normalizedPkgName}-preview/`,
      ) as string,
    },
  };
}

function updateProject(tree: Tree, options: NormalizedSchema) {
  const currentProjectName = options.projectConfig.name as string;
  const currentProjectNameRegex = new RegExp(currentProjectName, 'g');
  const newProjectName = options.migrated.projectName;
  const newProjectSourceRootPath = options.migrated.projectSourceRootPath;

  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    json.name = newProjectName;
    json.version = '0.1.0';
    json.beachball = json.beachball ?? {};
    json.beachball = { disallowedChangeTypes: ['major', 'prerelease'] };
    return json;
  });

  updateProjectConfiguration(tree, currentProjectName, {
    ...options.projectConfig,
    name: newProjectName,
    sourceRoot: newProjectSourceRootPath,
  });

  // update Markdown files

  const apiMdFilename = `${options.normalizedPkgName}.api.md`;
  const apiMdPath = joinPathFragments(options.projectConfig.root, 'etc', apiMdFilename);
  const apiMdPathNew = apiMdPath.replace(apiMdFilename, `${options.normalizedPkgName}-preview.api.md`);
  const apiMdContent = tree.read(apiMdPath, 'utf-8');
  const apiMdNewContent = apiMdContent?.replace(currentProjectNameRegex, newProjectName) as string;

  tree.write(apiMdPath, apiMdNewContent);
  tree.rename(apiMdPath, apiMdPathNew);

  const readmePath = joinPathFragments(options.projectConfig.root, 'README.md');
  const readmeContent = tree.read(readmePath, 'utf-8') as string;
  const readmeContentNew = readmeContent?.replace(currentProjectNameRegex, newProjectName);
  tree.write(readmePath, readmeContentNew);

  // update jest config

  const jestConfigContent = tree.read(options.paths.jestConfig, 'utf-8') as string;
  const jestConfigContentNew = jestConfigContent.replace(
    `'${options.normalizedPkgName}'`,
    `'${options.normalizedPkgName}-preview'`,
  );
  tree.write(options.paths.jestConfig, jestConfigContentNew);

  // update all ECMA imports

  visitNotIgnoredFiles(tree, options.projectConfig.root, projectFilePath => {
    if (/\.[tj]sx?$/.test(projectFilePath)) {
      const content = tree.read(projectFilePath, 'utf-8');
      const contentNew = content?.replace(currentProjectNameRegex, newProjectName) as string;
      tree.write(projectFilePath, contentNew);
    }
  });

  // rename project directory

  tree.rename(options.projectConfig.root, options.migrated.projectRootPath);

  // update TS global config

  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    delete json.compilerOptions.paths[currentProjectName];
    json.compilerOptions.paths[newProjectName] = [newProjectSourceRootPath];
    return json;
  });
}

function checkProject(tree: Tree, options: NormalizedSchema) {
  if (!isPackageConverged(tree, options.projectConfig)) {
    throw new Error(`${options.projectConfig.name} is not v9 package - migration not applicable`);
  }

  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);

  const isPrerelease = semver.prerelease(pkgJson.version);

  if (!isPrerelease) {
    throw new Error(`${options.projectConfig.name} is not a pre-release package - migration not applicable`);
  }
}

/**
 * Check whether the project to be migrated is depended on by another project
 *
 * Throws an error if the project is in use, unless the `--force` option is used.
 */
async function checkDependencies(tree: Tree, options: NormalizedSchema) {
  if (options.force) {
    return;
  }
  const projectName = options.projectConfig.name as string;

  const graph = await createProjectGraphAsync();
  const reverseGraph = reverse(graph);

  const suitePackageName = `@${options.workspaceConfig.npmScope}/react-components`;
  const deps = reverseGraph.dependencies[projectName] || [];
  const usedInReactComponentsUnstableSuiteApi = Boolean(deps.find(x => x.target === suitePackageName));
  const depsToBeMigrated = deps.filter(projectGraphDep => projectGraphDep.target !== suitePackageName);

  if (usedInReactComponentsUnstableSuiteApi) {
    logger.warn(
      stripIndents`> NOTE: ${projectName} is part of ${suitePackageName}/unstable api. Don't change anything in suite unstable API!`,
    );
  }

  if (depsToBeMigrated.length > 0) {
    throw new Error(
      stripIndents`${projectName} is still depended on by the following projects:
      ${depsToBeMigrated.map(projectGraphDep => projectGraphDep.target).join('\n')}

      !!! 👉 Migrate those projects to use '${options.migrated.projectName}' 👈 !!!`,
    );
  }
}
