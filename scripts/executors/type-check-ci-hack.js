/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');

const { getAffectedPackages } = require('@fluentui/scripts-monorepo');
const { workspaceRoot, joinPathFragments, createProjectGraphAsync } = require('@nx/devkit');
const { FsTree } = require('nx/src/generators/tree');
const yargs = require('yargs');

main().catch(err => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const { base } = processArgs();
  const tree = new FsTree(workspaceRoot, false);
  const affected = getNormalizeAffected(base);
  /** @type {import('@nx/devkit').ProjectGraph} */
  const nxGraph = await createProjectGraphAsync();

  const projectsToBuildFirst = Array.from(getProjectsThatNeedTriggerBuildInAdvance({ affected, nxGraph, tree }));

  if (projectsToBuildFirst.length > 0) {
    console.info(
      '',
      `💁: generating .d.ts files first in order to drastically speed up type-check command for v9 packages:\n`,
      '- ' + projectsToBuildFirst.join('\n - '),
      '',
    );

    return execSync(`yarn lage build --to ${projectsToBuildFirst.join(' ')}`);
  }
}

function processArgs() {
  const args = yargs
    .option('base', {
      type: 'string',
      description: 'Base of the current branch (usually main or master)',
      default: 'origin/master',
    })
    .version(false).argv;

  return args;
}

/**
 * @param {string} base
 */
function getNormalizeAffected(base) {
  const affectedSet = getAffectedPackages(base);
  // noop is a dummy package that lives within packages/fluentui - for legacy lerna workaround within react-northstar
  affectedSet.delete('@fluentui/noop');
  return Array.from(affectedSet);
}

/**
 * @param {import('@nx/devkit').ProjectConfiguration} project
 */
function isVNextProject(project) {
  return project.tags?.indexOf('vNext') !== -1;
}

/**
 *
 * @param {{tree: import('@nx/devkit').Tree, affected:string[]; nxGraph: import('@nx/devkit').ProjectGraph}} options
 */
function getProjectsThatNeedTriggerBuildInAdvance(options) {
  const { affected, nxGraph, tree } = options;

  /** @type {Set<string>} */
  const pkgsToBuild = new Set();
  const wholeGraphDependencies = nxGraph.dependencies;

  const v9SuiteDeps = new Set(
    nxGraph.dependencies['@fluentui/react-components'].map(dep => {
      return dep.target;
    }),
  );

  affected.forEach(pkgName => {
    const project = nxGraph.nodes[pkgName].data;
    const isVNext = isVNextProject(project);
    const hasStories = tree.exists(joinPathFragments(project.root, 'stories'));
    // @ts-ignore - bug in nx types, projectType is part of API
    const isLibrary = project.projectType === 'library';
    const isProjectCandidateForPreBuildTrigger = isVNext && hasStories && isLibrary;

    if (!isProjectCandidateForPreBuildTrigger) {
      return;
    }

    const projectGraphDependencies = wholeGraphDependencies[pkgName];

    projectGraphDependencies.forEach(value => {
      const { target } = value;
      // not interested in 3rd party packages/dependencies
      if (target.indexOf('npm:') !== -1) {
        return;
      }

      const dependantProject = nxGraph.nodes[target].data;

      if (!isVNextProject(dependantProject)) {
        return;
      }
      // if project is already specified as react-components suite dependency --> skip
      if (v9SuiteDeps.has(target)) {
        return;
      }

      pkgsToBuild.add(target);
    });
  });

  return pkgsToBuild;
}
