import { execSync } from 'child_process';

import {
  Tree,
  formatFiles,
  names,
  updateJson,
  ProjectConfiguration,
  joinPathFragments,
  visitNotIgnoredFiles,
  createProjectGraphAsync,
  reverse,
  installPackagesTask,
  readJson,
  stripIndents,
  workspaceRoot,
} from '@nrwl/devkit';
import * as tsquery from '@phenomnomnominal/tsquery';

import { getProjectConfig, getProjectNameWithoutScope, workspacePaths } from '../../utils';

import { PackageJson, TsConfig } from '../../types';

import tsConfigBaseAll from '../tsconfig-base-all';

import { assertStoriesProject, isSplitProject as isSplitProjectFn } from '../split-library-in-two/shared';

import { ReleasePackageGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: ReleasePackageGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  const isSplitProject = isSplitProjectFn(tree, options.projectConfig);

  assertProject(tree, { isSplitProject, ...options });

  const tasks: Array<(tree: Tree) => void> = [];

  if (options.phase === 'preview' || options.phase === 'compat') {
    tasks.push(initialRelease(tree, options));
  }
  if (options.phase === 'stable') {
    tasks.push(await stableRelease(tree, { isSplitProject, ...options }));
  }

  await formatFiles(tree);

  return () => {
    tasks.forEach(task => {
      task(tree);
    });
  };
}

function normalizeOptions(tree: Tree, options: ReleasePackageGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.project });

  return {
    ...options,
    ...project,
    ...names(options.project),
  };
}

function initialRelease(tree: Tree, options: NormalizedSchema) {
  const phase = options.phase;
  if (phase === 'stable') {
    throw new Error('invalid logic for options.phase.');
  }

  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    delete json.private;
    return json;
  });

  const docsiteProjectName = '@' + options.workspaceConfig.npmScope + '/public-docsite-v9';
  const docsite = getProjectConfig(tree, { packageName: docsiteProjectName });

  updateJson<PackageJson>(tree, docsite.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    json.dependencies[options.project] = '*';
    return json;
  });

  return (_tree: Tree) => {
    const changeTypes = { preview: 'minor', compat: 'patch' } as const;
    generateChangefileTask(tree, options.project, {
      changeType: changeTypes[phase],
      message: `feat: release ${options.phase} package`,
    });
  };
}

async function stableRelease(tree: Tree, options: NormalizedSchema & { isSplitProject: boolean }) {
  const suitePackageName = '@' + options.workspaceConfig.npmScope + '/react-components';
  const currentPackageName = options.projectConfig.name as string;

  const newPackage = {
    name: currentPackageName.replace('-preview', ''),
    normalizedName: options.normalizedPkgName.replace('-preview', ''),
    version: '9.0.0-alpha.0',
    root: options.projectConfig.root.replace('-preview', ''),
    sourceRoot: options.projectConfig.sourceRoot?.replace('-preview', '') as string,
  };

  const contentNameUpdater = (content: string) => {
    const regexp = new RegExp(options.normalizedPkgName, 'g');
    return content.replace(regexp, newPackage.normalizedName);
  };
  const contentNameToSuiteUpdater = (content: string) => {
    const regexp = new RegExp(options.normalizedPkgName, 'g');
    return content.replace(regexp, 'react-components');
  };

  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    delete json.private;
    json.name = newPackage.name;
    json.version = newPackage.version;
    return json;
  });
  updateJson<ProjectConfiguration>(tree, options.paths.projectJson, json => {
    json.name = newPackage.name;
    json.sourceRoot = newPackage.sourceRoot;

    return json;
  });

  updateFileContent(tree, { filePath: options.paths.jestConfig, updater: contentNameUpdater });

  const bundleSizeFixturesRoot = joinPathFragments(options.projectConfig.root, 'bundle-size');
  if (tree.exists(bundleSizeFixturesRoot)) {
    visitNotIgnoredFiles(tree, bundleSizeFixturesRoot, filePath => {
      updateFileContent(tree, {
        filePath,
        updater: contentNameUpdater,
      });
    });
  }

  const mdFilePath = {
    readme: joinPathFragments(options.projectConfig.root, 'README.md'),
    api: joinPathFragments(options.projectConfig.root, 'etc', options.normalizedPkgName + '.api.md'),
    apiNew: joinPathFragments(options.projectConfig.root, 'etc', newPackage.normalizedName + '.api.md'),
  };

  updateFileContent(tree, {
    filePath: mdFilePath.readme,
    updater: contentNameUpdater,
  });
  updateFileContent(tree, { filePath: mdFilePath.api, newFilePath: mdFilePath.apiNew, updater: contentNameUpdater });

  if (options.isSplitProject) {
    const { storiesProjectPaths } = stableReleaseForSplitProject(tree, options);
    updateStories(tree, { storiesSourcePath: storiesProjectPaths.sourceRoot, contentNameToSuiteUpdater });
  } else {
    updateStories(tree, { storiesSourcePath: options.paths.stories, contentNameToSuiteUpdater });
  }

  // global updates
  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};

    delete json.compilerOptions.paths[currentPackageName];
    json.compilerOptions.paths[newPackage.name] = [joinPathFragments(newPackage.sourceRoot, 'index.ts')];

    return json;
  });

  await tsConfigBaseAll(tree, {});

  updateFileContent(tree, { filePath: workspacePaths.github.codeowners, updater: contentNameUpdater });

  // add to suite (react-components)
  const reactComponentsProject = getProjectConfig(tree, {
    packageName: suitePackageName,
  });
  updateJson<PackageJson>(tree, reactComponentsProject.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    json.dependencies[newPackage.name] = newPackage.version;
    return json;
  });

  updateFileContent(tree, {
    filePath: joinPathFragments(reactComponentsProject.projectConfig.sourceRoot as string, 'index.ts'),
    updater: content => {
      const currentBarrelFilePath = joinPathFragments(options.projectConfig.sourceRoot as string, 'index.ts');
      const currentBarrelFile = tree.read(currentBarrelFilePath, 'utf-8') as string;
      return content + '\n' + createExportsInSuite(currentBarrelFile, newPackage.name);
    },
  });

  const knownProjectsToBeUpdated = {
    docsite: '@' + options.workspaceConfig.npmScope + '/public-docsite-v9',
    vrTests: '@' + options.workspaceConfig.npmScope + '/vr-tests-react-components',
  };

  // update other projects that might still contain dependency to old -preview package
  const unknownProjectsToBeUpdated = (await getProjectThatNeedsToBeUpdated(tree, options))?.filter(projectName => {
    const knownKeys = Object.values(knownProjectsToBeUpdated);
    return !knownKeys.includes(projectName);
  });

  // update public-docsite-v9
  const reactComponentsDocsiteProject = getProjectConfig(tree, {
    packageName: knownProjectsToBeUpdated.docsite,
  });
  updateJson<PackageJson>(tree, reactComponentsDocsiteProject.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    delete json.dependencies[currentPackageName];
    return json;
  });
  visitNotIgnoredFiles(tree, joinPathFragments(reactComponentsDocsiteProject.projectConfig.root, 'src'), filePath => {
    updateFileContent(tree, { filePath, updater: contentNameToSuiteUpdater });
  });

  // update vr-tests-react-components
  const reactComponentsVrTestsProject = getProjectConfig(tree, {
    packageName: knownProjectsToBeUpdated.vrTests,
  });
  updateJson<PackageJson>(tree, reactComponentsVrTestsProject.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    delete json.dependencies[currentPackageName];
    // when going from preview to stable, package version changes to `9.0.0-alpha` in order to beachball properly bump to `9.0.0` stable.
    // thus dependency on the package within workspace packages cannot use `*` but `>=9.0.0-alpha`
    // on CI (release,pr) this is being checked normalized via [normalize-package-dependencies generator](tools/workspace-plugin/src/generators/normalize-package-dependencies/index.ts)
    json.dependencies[newPackage.name] = '>=9.0.0-alpha';
    return json;
  });
  visitNotIgnoredFiles(
    tree,
    joinPathFragments(reactComponentsVrTestsProject.projectConfig.root, 'src/stories'),
    filePath => {
      updateFileContent(tree, { filePath, updater: contentNameUpdater });
    },
  );

  unknownProjectsToBeUpdated?.forEach(projectName => {
    const projectConfig = getProjectConfig(tree, {
      packageName: projectName,
    });
    visitNotIgnoredFiles(tree, joinPathFragments(projectConfig.projectConfig.root, 'src'), filePath => {
      updateFileContent(tree, { filePath, updater: contentNameToSuiteUpdater });
    });
    updateJson<PackageJson>(tree, joinPathFragments(projectConfig.projectConfig.root, 'package.json'), json => {
      json.dependencies = json.dependencies ?? {};
      delete json.dependencies[currentPackageName];
      json.dependencies[suitePackageName] = '*';
      return json;
    });
  });

  // AFTER updates are done - rename project folder
  if (options.isSplitProject) {
    const hostFolder = joinPathFragments(options.projectConfig.root, '..');
    tree.rename(hostFolder, hostFolder.replace('-preview', ''));
  } else {
    tree.rename(options.projectConfig.root, newPackage.root);
  }

  return (_tree: Tree) => {
    installPackagesTask(tree, true);
    generateChangefileTask(tree, newPackage.name, { message: 'feat: release stable', changeType: 'minor' });
    generateChangefileTask(tree, suitePackageName, {
      message: `feat: add ${newPackage.name} to suite`,
      changeType: 'minor',
    });
    generateApiMarkdownTask(tree, suitePackageName);
  };
}

function stableReleaseForSplitProject(tree: Tree, options: NormalizedSchema) {
  const storiesProjectRoot = joinPathFragments(options.projectConfig.root, '../stories');
  const currentStoriesPackageName = options.projectConfig.name + '-stories';
  const currentStoriesNormalizedPackageName = getProjectNameWithoutScope(currentStoriesPackageName);
  const storiesProjectPaths = {
    root: storiesProjectRoot,
    sourceRoot: joinPathFragments(storiesProjectRoot, 'src'),
    packageJson: joinPathFragments(storiesProjectRoot, 'package.json'),
    projectJson: joinPathFragments(storiesProjectRoot, 'project.json'),
    readme: joinPathFragments(storiesProjectRoot, 'README.md'),
  };
  const newStoriesProject = {
    name: currentStoriesPackageName.replace('-preview', ''),
    normalizedName: currentStoriesNormalizedPackageName.replace('-preview', ''),
    root: storiesProjectPaths.root.replace('-preview', ''),
    sourceRoot: storiesProjectPaths.sourceRoot.replace('-preview', ''),
  };

  const contentNameUpdaterStories = (content: string) => {
    const regexp = new RegExp(currentStoriesNormalizedPackageName, 'g');
    return content.replace(regexp, newStoriesProject.normalizedName);
  };

  updateJson<PackageJson>(tree, storiesProjectPaths.packageJson, json => {
    json.name = newStoriesProject.name;

    return json;
  });

  updateJson<ProjectConfiguration>(tree, storiesProjectPaths.projectJson, json => {
    json.name = newStoriesProject.name;
    json.sourceRoot = newStoriesProject.sourceRoot;

    return json;
  });

  updateFileContent(tree, {
    filePath: storiesProjectPaths.readme,
    updater: contentNameUpdaterStories,
  });

  // global updates
  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};

    delete json.compilerOptions.paths[currentStoriesPackageName];
    json.compilerOptions.paths[newStoriesProject.name] = [joinPathFragments(newStoriesProject.sourceRoot, 'index.ts')];

    return json;
  });

  updateFileContent(tree, {
    filePath: workspacePaths.github.codeowners,
    updater: contentNameUpdaterStories,
  });

  return { storiesProjectPaths };
}

function updateFileContent(
  tree: Tree,
  options: {
    filePath: string;
    updater: (content: string) => string;
    newFilePath?: string;
  },
) {
  const { filePath, newFilePath, updater } = options;
  const oldContent = tree.read(filePath, 'utf-8') as string;

  const newContent = updater(oldContent);

  if (newFilePath) {
    tree.rename(filePath, newFilePath);
    tree.write(newFilePath, newContent);
  } else {
    tree.write(filePath, newContent);
  }

  return tree;
}

async function getProjectThatNeedsToBeUpdated(tree: Tree, options: NormalizedSchema) {
  const projectName = options.projectConfig.name as string;

  const graph = await createProjectGraphAsync();
  const reverseGraph = reverse(graph);

  const deps = reverseGraph.dependencies[projectName] || [];

  if (deps.length > 0) {
    return deps.map(dep => dep.target);
  }
}

function generateChangefileTask(
  tree: Tree,
  projectName: string,
  options: { changeType: 'minor' | 'patch'; message: string },
) {
  const cmd = `yarn change --message '${options.message}' --type ${options.changeType} --package ${projectName}`;
  return execSync(cmd, { cwd: workspaceRoot, stdio: 'inherit' });
}

function generateApiMarkdownTask(tree: Tree, projectName: string) {
  const cmd = `yarn lage generate-api --to ${projectName}`;
  return execSync(cmd, { cwd: workspaceRoot, stdio: 'inherit' });
}

function assertProject(tree: Tree, options: NormalizedSchema & { isSplitProject: boolean }) {
  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);

  const isVnextPackage = options.projectConfig.tags?.includes('vNext');
  const isPreviewPackage = pkgJson.version.startsWith('0') && pkgJson.name.endsWith('-preview');
  const isCompatPackage = isVnextPackage && options.projectConfig.tags?.includes('compat');
  const isPreparedForStableAlready = pkgJson.version === '9.0.0-alpha.0';
  const isStableAlready = /^9\.\d+.\d+$/.test(pkgJson.version);

  if (!isVnextPackage) {
    throw new Error(`${options.project} is not a v9 package.`);
  }

  if (isCompatPackage && options.phase !== 'compat') {
    throw new Error(
      `Invalid phase(${options.phase}) option provided. ${options.project} is a COMPAT package thus phase needs to be 'compat'.`,
    );
  }

  if (isPreviewPackage && options.phase === 'compat') {
    throw new Error(
      `Invalid phase(${options.phase}) option provided. ${options.project} is a PREVIEW package thus phase needs to be one of 'preview'|'stable'.`,
    );
  }

  if (isPreparedForStableAlready) {
    throw new Error(`${options.project} is already prepared for stable release. Please trigger RELEASE pipeline.`);
  }

  if (isStableAlready) {
    throw new Error(`${options.project} is already released as stable.`);
  }

  assertStoriesProject(tree, { isSplitProject: options.isSplitProject, project: options.projectConfig });
}

function createExportsInSuite(content: string, packageName: string) {
  const ast = tsquery.ast(content);
  const exports = tsquery.query(ast, 'ExportDeclaration[isTypeOnly=false] ExportSpecifier');
  const exportsTypes = tsquery.query(ast, 'ExportDeclaration[isTypeOnly=true] ExportSpecifier');

  const exportExpression = exports
    .map(exp => {
      return tsquery.print(exp);
    })
    .join(',');
  const exportTypeExpression = exportsTypes
    .map(exp => {
      return tsquery.print(exp);
    })
    .join(',');

  return stripIndents`
     export { ${exportExpression} } from '${packageName}';
     export type { ${exportTypeExpression} } from '${packageName}';
    `;
}

function updateStories(
  tree: Tree,
  options: { storiesSourcePath: string; contentNameToSuiteUpdater: (content: string) => string },
) {
  visitNotIgnoredFiles(tree, options.storiesSourcePath, filePath => {
    updateFileContent(tree, {
      filePath,
      updater: content => {
        let newContent = options.contentNameToSuiteUpdater(content);

        if (filePath.indexOf('index.stories.tsx') !== -1) {
          newContent = newContent.replace(`'Preview `, `'`);
        }

        return newContent;
      },
    });
  });
}
