const { execSync } = require('child_process');

const { getAffectedPackages } = require('@fluentui/scripts-monorepo');
const { workspaceRoot, joinPathFragments, createProjectGraphAsync } = require('@nrwl/devkit');
const { FsTree } = require('nx/src/config/tree');
const yargs = require('yargs');

main().catch(err => {
  console.error(err);
  process.exit(1);
});

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

async function main() {
  const { base } = processArgs();
  const affectedSet = getAffectedPackages(base);
  affectedSet.delete('@fluentui/noop');
  const affected = Array.from(affectedSet);
  const tree = new FsTree(workspaceRoot, false);
  /** @type {import('@nrwl/devkit').ProjectGraph<{}>} */
  const nxGraph = await createProjectGraphAsync();

  const v9SuiteDeps = new Set(
    nxGraph.dependencies['@fluentui/react-components'].map(dep => {
      return dep.target;
    }),
  );

  /**
   *
   * @param {string[]} affectedPkgs
   */
  function handleSpecialPkgDependencies(affectedPkgs) {
    /** @type {Set<string>} */
    const pkgsToBuild = new Set();
    const deps = nxGraph.dependencies;

    affectedPkgs.forEach(pkgName => {
      const project = nxGraph.nodes[pkgName].data;
      const isVNext = project.tags?.indexOf('vNext') !== -1;
      const hasStories = tree.exists(joinPathFragments(project.root, 'stories'));
      // @ts-ignore - bug in nx types, projectType is part of API
      const isLibrary = project.projectType === 'library';

      if (!(isVNext && hasStories && isLibrary)) {
        return;
      }

      deps[pkgName].forEach(value => {
        const target = value.target;
        if (target.indexOf('npm:') !== -1) {
          return;
        }

        const projectInner = nxGraph.nodes[target].data;
        const isVNextInner = projectInner.tags?.indexOf('vNext') !== -1;

        if (!isVNextInner) {
          return;
        }
        if (v9SuiteDeps.has(target)) {
          return;
        }

        pkgsToBuild.add(target);
      });
    });

    return pkgsToBuild;
  }

  const packagesToBuildFirst = Array.from(handleSpecialPkgDependencies(affected));

  if (packagesToBuildFirst.length > 0) {
    console.info(
      '',
      `💁: generating .d.ts files first in order to drastically speed up type-check command for v9 packages:\n`,
      '- ' + packagesToBuildFirst.join('\n - '),
      '',
    );

    execSync(`yarn lage build --to ${packagesToBuildFirst.join(' ')}`);
  }
}
