/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');
const fs = require('fs');

const { workspaceRoot, joinPathFragments, createProjectGraphAsync, visitNotIgnoredFiles } = require('@nx/devkit');
const tsquery = require('@phenomnomnominal/tsquery');
const { FsTree } = require('nx/src/generators/tree');

mainV2()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function mainV2() {
  const tree = new FsTree(workspaceRoot, false);
  const projectRoot = process.cwd();

  const projectJson = JSON.parse(fs.readFileSync(joinPathFragments(projectRoot, 'package.json'), 'utf-8'));
  const pkgName = projectJson.name;

  const nxGraph = await createProjectGraphAsync();
  const projectConfig = nxGraph.nodes[pkgName].data;

  const isVNext = isVNextProject(projectConfig);
  const hasStories = tree.exists(joinPathFragments(projectConfig.root, 'stories'));
  const isLibrary = projectConfig.projectType === 'library';
  const isProjectCandidateForPreBuildTrigger = isVNext && hasStories && isLibrary;

  if (!isProjectCandidateForPreBuildTrigger) {
    console.info('No need to build circulars first, skipping type-check-ci-hack-scoped');
    return;
  }

  const packageDeps = new Set(
    nxGraph.dependencies[pkgName].map(dep => {
      return dep.target;
    }),
  );
  // every package having stories depends on workspace addons
  packageDeps.add('@fluentui/react-storybook-addon-export-to-sandbox');

  const ghostDependencies = getGhostDependencies(tree, projectConfig, packageDeps, nxGraph);

  if (ghostDependencies.length === 0) {
    return;
  }

  console.info(
    '',
    `💁: generating .d.ts files first in order to drastically speed up type-check command for v9 packages:\n`,
    ' - ' + ghostDependencies.join('\n - '),
    '',
  );

  const cmd = `yarn lage build --to ${ghostDependencies.join(' ')}`;

  console.info('', '🏃:' + ` ${cmd}`, '');

  execSync(cmd);
}

/**
 *
 * @param {import('@nx/devkit').Tree} tree
 * @param {string} filePath
 * @returns
 */
function getImportPaths(tree, filePath) {
  const fileContent = tree.read(filePath, 'utf8') ?? '';
  const ast = tsquery.ast(fileContent);
  /** @type {import("typescript").ImportDeclaration[]} */
  const importNodes = tsquery.match(ast, 'ImportDeclaration');

  const importPaths = importNodes.map(node => node.moduleSpecifier.getText().replace(/['"]/g, ''));

  return importPaths;
}

/**
 *
 * @param {import('@nx/devkit').Tree} tree
 * @param {import('@nx/devkit').ProjectConfiguration} projectConfig
 * @returns
 */
function getImportsFromStories(tree, projectConfig) {
  const storiesDir = joinPathFragments(projectConfig.root, 'stories');

  /**
   * @type {string[]}
   */
  const imports = [];

  visitNotIgnoredFiles(tree, storiesDir, file => {
    if (!(file.endsWith('.stories.tsx') || file.endsWith('.stories.ts'))) {
      return;
    }

    const importPaths = getImportPaths(tree, file);
    imports.push(...importPaths);
  });

  return new Set(imports);
}

/**
 * @param {import('@nx/devkit').ProjectConfiguration} project
 */
function isVNextProject(project) {
  return project.tags?.indexOf('vNext') !== -1;
}

/**
 *
 * @param {import('@nx/devkit').Tree} tree
 * @param {import('@nx/devkit').ProjectConfiguration} projectConfig
 * @param {Set<string>} packageDeps
 * @param {import('@nx/devkit').ProjectGraph} nxGraph
 */
function getGhostDependencies(tree, projectConfig, packageDeps, nxGraph) {
  const imports = getImportsFromStories(tree, projectConfig);

  /** @type {string[]} */
  const workspaceImports = [];

  imports.forEach(importPath => {
    const isWorkspaceDependency = nxGraph.nodes[importPath];
    const isDefinedPackageDependency = packageDeps.has(importPath);

    if (isWorkspaceDependency && !isDefinedPackageDependency) {
      workspaceImports.push(importPath);
    }
  });

  return workspaceImports;
}
