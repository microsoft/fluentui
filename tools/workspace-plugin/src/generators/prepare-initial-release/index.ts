import { execSync } from 'child_process';

import {
  formatFiles,
  names,
  updateJson,
  joinPathFragments,
  visitNotIgnoredFiles,
  createProjectGraphAsync,
  reverse,
  installPackagesTask,
  readJson,
  stripIndents,
  workspaceRoot,
  logger,
  type ProjectConfiguration,
  type Tree,
  type ProjectGraph,
} from '@nx/devkit';
import * as tsquery from '@phenomnomnominal/tsquery';

import { getProjectConfig, workspacePaths } from '../../utils';

import { type PackageJson, type TsConfig } from '../../types';

import tsConfigBaseAll from '../tsconfig-base-all';

import { assertStoriesProject, isSplitProject as isSplitProjectFn } from '../split-library-in-two/shared';

import { type ReleasePackageGeneratorSchema } from './schema';
import { visitNotGitIgnoredFiles } from './lib/utils';

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
    npmPackageName: `@${project.workspaceConfig.npmScope}/${project.projectConfig.name}`,
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

  const docsiteProjectName = 'public-docsite-v9';
  const docsite = getProjectConfig(tree, { packageName: docsiteProjectName });

  updateJson<PackageJson>(tree, docsite.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    json.dependencies[options.npmPackageName] = '*';
    return json;
  });

  return (_tree: Tree) => {
    const changeTypes = { preview: 'minor', compat: 'patch' } as const;
    generateChangefileTask(tree, options.npmPackageName, {
      changeType: changeTypes[phase],
      message: `feat: release ${options.phase} package`,
    });
  };
}

async function stableRelease(tree: Tree, options: NormalizedSchema & { isSplitProject: boolean }) {
  const suiteProjectName = 'react-components';
  const suiteNpmProjectName = `@${options.workspaceConfig.npmScope}/${suiteProjectName}`;
  const currentPackage = {
    name: options.projectConfig.name as string,
    npmName: options.npmPackageName,
  };

  const newPackage = {
    name: currentPackage.name.replace('-preview', ''),
    npmName: currentPackage.npmName.replace('-preview', ''),
    version: '9.0.0-alpha.0',
    root: options.projectConfig.root.replace('-preview', ''),
    sourceRoot: options.projectConfig.sourceRoot?.replace('-preview', '') as string,
  };

  const contentNameUpdater = (content: string) => {
    const regexp = new RegExp(options.project, 'g');
    return content.replace(regexp, newPackage.name);
  };
  const contentNameToSuiteUpdater = (content: string) => {
    const regexp = new RegExp(options.project, 'g');
    return content.replace(regexp, 'react-components');
  };

  // clean node_modules so we don't perform unnecessary RENAMES later
  tree.delete(joinPathFragments(options.projectConfig.root, 'node_modules'));

  // we need to update projects that might still contain dependency to old -preview package first
  await updateProjectsThatUsedPreviewPackage();

  // now we can update the preview package itself
  updateJson<PackageJson>(tree, options.paths.packageJson, json => {
    delete json.private;
    json.name = newPackage.npmName;
    json.version = newPackage.version;
    return json;
  });
  updateJson<ProjectConfiguration>(tree, options.paths.projectJson, json => {
    json.name = newPackage.name;
    json.sourceRoot = newPackage.sourceRoot;

    return json;
  });

  updateFileContent(tree, { filePath: options.paths.jestConfig, updater: contentNameUpdater });

  // update any references to self within source code
  if (options.projectConfig.sourceRoot) {
    visitNotIgnoredFiles(tree, joinPathFragments(options.projectConfig.sourceRoot), filePath => {
      updateFileContent(tree, {
        filePath,
        updater: contentNameUpdater,
      });
    });
  }

  const bundleSizeFixturesRoot = joinPathFragments(options.projectConfig.root, 'bundle-size');
  if (tree.exists(bundleSizeFixturesRoot)) {
    visitNotGitIgnoredFiles(tree, bundleSizeFixturesRoot, filePath => {
      updateFileContent(tree, {
        filePath,
        updater: contentNameUpdater,
      });
    });
  }

  const mdFilePath = {
    spec: joinPathFragments(options.projectConfig.root, 'docs/Spec.md'),
    readme: joinPathFragments(options.projectConfig.root, 'README.md'),
    api: joinPathFragments(options.projectConfig.root, 'etc', options.project + '.api.md'),
    apiNew: joinPathFragments(options.projectConfig.root, 'etc', newPackage.name + '.api.md'),
    license: joinPathFragments(options.projectConfig.root, 'LICENSE'),
  };

  updateFileContent(tree, {
    filePath: mdFilePath.license,
    updater: contentNameUpdater,
  });
  updateFileContent(tree, {
    filePath: mdFilePath.spec,
    updater: contentNameUpdater,
  });
  updateFileContent(tree, {
    filePath: mdFilePath.readme,
    updater: contentNameUpdater,
  });
  updateFileContent(tree, { filePath: mdFilePath.api, newFilePath: mdFilePath.apiNew, updater: contentNameUpdater });

  if (options.isSplitProject) {
    const { storiesProjectPaths } = stableReleaseForStoriesProject(tree, options);
    updateStories(tree, { storiesSourcePath: storiesProjectPaths.sourceRoot, contentNameToSuiteUpdater });
  } else {
    updateStories(tree, { storiesSourcePath: options.paths.stories, contentNameToSuiteUpdater });
  }

  // global updates
  updateJson<TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};

    delete json.compilerOptions.paths[currentPackage.npmName];
    json.compilerOptions.paths[newPackage.npmName] = [joinPathFragments(newPackage.sourceRoot, 'index.ts')];

    return json;
  });

  await tsConfigBaseAll(tree, { skipFormat: true });

  updateFileContent(tree, { filePath: workspacePaths.github.codeowners, updater: contentNameUpdater });

  // add to suite (react-components)
  const reactComponentsProject = getProjectConfig(tree, {
    packageName: suiteProjectName,
  });
  updateJson<PackageJson>(tree, reactComponentsProject.paths.packageJson, json => {
    json.dependencies = json.dependencies ?? {};
    json.dependencies[newPackage.npmName] = newPackage.version;
    return json;
  });

  updateFileContent(tree, {
    filePath: joinPathFragments(reactComponentsProject.projectConfig.sourceRoot as string, 'index.ts'),
    updater: content => {
      const currentBarrelFilePath = joinPathFragments(options.projectConfig.sourceRoot as string, 'index.ts');
      const currentBarrelFile = tree.read(currentBarrelFilePath, 'utf-8') as string;
      return content + '\n' + createExportsInSuite(currentBarrelFile, newPackage.npmName);
    },
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
    generateChangefileTask(tree, newPackage.npmName, { message: 'feat: release stable', changeType: 'minor' });
    generateChangefileTask(tree, suiteNpmProjectName, {
      message: `feat: add ${newPackage.npmName} to suite`,
      changeType: 'minor',
    });
    generateApiMarkdownTask(tree, suiteProjectName);
  };

  async function updateProjectsThatUsedPreviewPackage() {
    const graph = await createProjectGraphAsync();
    const projectsToUpdate = await getProjectThatNeedsToBeUpdated(graph, options);
    const ignoreProjects = [
      // we don't wanna update `*-stories` project based on Graph - stories project is updated later which doesn't uses Graph rather relies on our custom imports parser and package.json template
      // TODO: re-evaluate this approach if we should not rather use Graph for everything
      options.isSplitProject ? options.projectConfig.name + '-stories' : null,
    ].filter(Boolean) as string[];

    const knownProjectsToBeUpdated = {
      docsite: 'public-docsite-v9',
      vrTests: 'vr-tests-react-components',
    };

    // update other projects that might still contain dependency to old -preview package
    const unknownProjectsToBeUpdated = projectsToUpdate
      ? projectsToUpdate.filter(projectName => {
          if (ignoreProjects.includes(projectName)) {
            return false;
          }

          const knownKeys = Object.values(knownProjectsToBeUpdated);
          return !knownKeys.includes(projectName);
        })
      : null;

    // update public-docsite-v9
    const reactComponentsDocsiteProject = getProjectConfig(tree, {
      packageName: knownProjectsToBeUpdated.docsite,
    });
    updateJson<PackageJson>(tree, reactComponentsDocsiteProject.paths.packageJson, json => {
      json.dependencies = json.dependencies ?? {};
      // preview package is now part of the suite, so we don't need it being specified as a dependency of the docsite
      delete json.dependencies[currentPackage.npmName];
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
      delete json.dependencies[currentPackage.npmName];
      // when going from preview to stable, package version changes to `9.0.0-alpha` in order to beachball properly bump to `9.0.0` stable.
      // thus dependency on the package within workspace packages cannot use `*` but `>=9.0.0-alpha`
      // on CI (release,pr) this is being checked normalized via [normalize-package-dependencies generator](tools/workspace-plugin/src/generators/normalize-package-dependencies/index.ts)
      json.dependencies[newPackage.npmName] = '>=9.0.0-alpha';
      return json;
    });
    visitNotIgnoredFiles(
      tree,
      joinPathFragments(reactComponentsVrTestsProject.projectConfig.root, 'src/stories'),
      filePath => {
        updateFileContent(tree, { filePath, updater: contentNameUpdater });
      },
    );

    if (!unknownProjectsToBeUpdated) {
      return;
    }

    unknownProjectsToBeUpdated.forEach(projectName => {
      const projectConfig = getProjectConfig(tree, {
        packageName: projectName,
      });
      visitNotIgnoredFiles(tree, joinPathFragments(projectConfig.projectConfig.root, 'src'), filePath => {
        updateFileContent(tree, { filePath, updater: contentNameToSuiteUpdater });
      });
      updateJson<PackageJson>(tree, joinPathFragments(projectConfig.projectConfig.root, 'package.json'), json => {
        json.dependencies = json.dependencies ?? {};
        delete json.dependencies[currentPackage.npmName];
        json.dependencies[suiteNpmProjectName] = '*';
        return json;
      });
    });
  }
}

function stableReleaseForStoriesProject(tree: Tree, options: NormalizedSchema) {
  const storiesProjectRoot = joinPathFragments(options.projectConfig.root, '../stories');
  const currentStoriesPackage = {
    name: options.projectConfig.name + '-stories',
    npmName: options.npmPackageName + '-stories',
  };

  const storiesProjectPaths = {
    root: storiesProjectRoot,
    sourceRoot: joinPathFragments(storiesProjectRoot, 'src'),
    packageJson: joinPathFragments(storiesProjectRoot, 'package.json'),
    projectJson: joinPathFragments(storiesProjectRoot, 'project.json'),
    readme: joinPathFragments(storiesProjectRoot, 'README.md'),
  };
  const newStoriesProject = {
    name: currentStoriesPackage.name.replace('-preview', ''),
    npmName: currentStoriesPackage.npmName.replace('-preview', ''),
    root: storiesProjectPaths.root.replace('-preview', ''),
    sourceRoot: storiesProjectPaths.sourceRoot.replace('-preview', ''),
  };

  const contentNameUpdaterStories = (content: string) => {
    const regexpStoryProject = new RegExp(currentStoriesPackage.name, 'g');
    const regexpLibraryProject = new RegExp(options.project, 'g');
    return content
      .replace(regexpStoryProject, newStoriesProject.name)
      .replace(regexpLibraryProject, options.project.replace('-preview', ''));
  };

  updateJson<PackageJson>(tree, storiesProjectPaths.packageJson, json => {
    json.name = newStoriesProject.npmName;

    delete json.devDependencies?.[options.npmPackageName];

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

    delete json.compilerOptions.paths[currentStoriesPackage.npmName];
    json.compilerOptions.paths[newStoriesProject.npmName] = [
      joinPathFragments(newStoriesProject.sourceRoot, 'index.ts'),
    ];

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

  if (!tree.exists(filePath)) {
    logger.warn(`attempt to update ${filePath} contents failed, because that path does not exist`);

    return tree;
  }

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

async function getProjectThatNeedsToBeUpdated(graph: ProjectGraph, options: NormalizedSchema) {
  const projectName = options.projectConfig.name as string;

  const reverseGraph = reverse(graph);

  const deps = reverseGraph.dependencies[projectName] || [];

  if (deps.length > 0) {
    return deps.map(dep => dep.target);
  }

  return null;
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
  const cmd = `yarn nx run ${projectName}:generate-api`;
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
