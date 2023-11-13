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

import { getProjectConfig, workspacePaths } from '../../utils';

import { PackageJson, TsConfig } from '../../types';

import tsConfigBaseAll from '../tsconfig-base-all';

import { ReleasePackageGeneratorSchema } from './schema';
import { execSync } from 'child_process';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: ReleasePackageGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  assertProject(tree, options);

  const tasks: Array<(tree: Tree) => void> = [];

  if (options.phase === 'preview') {
    tasks.push(initialRelease(tree, options));
  }
  if (options.phase === 'stable') {
    tasks.push(await stableRelease(tree, options));
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
    generateChangefileTask(tree, options.project, { message: 'feat: release preview package' });
  };
}

async function stableRelease(tree: Tree, options: NormalizedSchema) {
  const suitePackageName = '@' + options.workspaceConfig.npmScope + '/react-components';
  const currentPackageName = options.projectConfig.name as string;
  const newPackage = {
    name: currentPackageName.replace('-preview', ''),
    normalizedName: options.normalizedPkgName.replace('-preview', ''),
    version: '9.0.0-alpha.0',
    root: options.projectConfig.root.replace('-preview', ''),
    sourceRoot: options.projectConfig.sourceRoot?.replace('-preview', '') as string,
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

  const contentNameUpdater = (content: string) => {
    const regexp = new RegExp(options.normalizedPkgName, 'g');
    return content.replace(regexp, newPackage.normalizedName);
  };
  const contentNameToSuiteUpdater = (content: string) => {
    const regexp = new RegExp(options.normalizedPkgName, 'g');
    return content.replace(regexp, 'react-components');
  };

  updateFileContent(tree, { filePath: options.paths.jestConfig, updater: contentNameUpdater });

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

  // update stories
  visitNotIgnoredFiles(tree, options.paths.stories, filePath => {
    updateFileContent(tree, {
      filePath,
      updater: content => {
        let newContent = contentNameToSuiteUpdater(content);

        if (filePath.indexOf('index.stories.tsx') !== -1) {
          newContent = newContent.replace(`'Preview `, `'`);
        }

        return newContent;
      },
    });
  });

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
  tree.rename(options.projectConfig.root, newPackage.root);

  return (_tree: Tree) => {
    installPackagesTask(tree, true);
    generateChangefileTask(tree, newPackage.name, { message: 'feat: release stable' });
    generateChangefileTask(tree, suitePackageName, { message: `feat: add ${newPackage.name} to suite` });
    generateApiMarkdownTask(tree, suitePackageName);
  };
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

function generateChangefileTask(tree: Tree, projectName: string, options: { message: string }) {
  const cmd = `yarn change --message '${options.message}' --type minor --package ${projectName}`;
  return execSync(cmd, { cwd: workspaceRoot, stdio: 'inherit' });
}

function generateApiMarkdownTask(tree: Tree, projectName: string) {
  const cmd = `yarn lage generate-api --to ${projectName}`;
  return execSync(cmd, { cwd: workspaceRoot, stdio: 'inherit' });
}

function assertProject(tree: Tree, options: NormalizedSchema) {
  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);

  const isVnextPackage = options.projectConfig.tags?.includes('vNext');
  const isPreviewPackage = /* pkgJson.version.startsWith('0') &&  */ pkgJson.name.endsWith('-preview');
  const isPreparedForStableAlready = pkgJson.version === '9.0.0-alpha.0';

  if (!isVnextPackage) {
    throw new Error(`${options.project} is not a v9 package.`);
  }

  if (isPreviewPackage) {
    return;
  }

  if (isPreparedForStableAlready) {
    throw new Error(`${options.project} is already prepared for stable release. Please trigger RELEASE pipeline.`);
  }

  throw new Error(`${options.project} is already released as stable.`);
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
