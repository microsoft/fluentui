const { execSync } = require('child_process');

const { getAffectedPackages } = require('@fluentui/scripts-monorepo');
const { readProjectConfiguration, workspaceRoot, joinPathFragments } = require('@nrwl/devkit');
const { FsTree } = require('nx/src/config/tree');
const yargs = require('yargs');

main();

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

function main() {
  const { base } = processArgs();
  const affected = Array.from(getAffectedPackages(base));
  const tree = new FsTree(workspaceRoot, false);

  const needsReactComponentsDts = affected.some(projectName => {
    try {
      const project = readProjectConfiguration(tree, projectName);

      const isVNext = project.tags?.indexOf('vNext') !== -1;
      const hasStories = tree.exists(joinPathFragments(project.root, 'stories'));

      if (isVNext && hasStories) {
        return true;
      }
      // eslint-disable-next-line no-empty
    } catch {}

    return false;
  });

  /**
   *
   * @param {string[]} affectedPkgs
   */
  function handleSpecialPkgDependencies(affectedPkgs) {
    const specialPackages = { '@fluentui/react-table': ['@fluentui/react-data-grid-react-window'] };
    const packages = /** @type {string[]} */ (
      Object.entries(specialPackages)
        .map(([pkgName, dependencies]) => {
          if (affectedPkgs.includes(pkgName)) {
            return dependencies;
          }
          return;
        })
        .filter(Boolean)
        .flat()
    );

    return packages;
  }

  const nonSuiteAffectedPackages = handleSpecialPkgDependencies(affected);

  const packagesToBuildFirst = [
    needsReactComponentsDts ? '@fluentui/react-components' : null,
    ...nonSuiteAffectedPackages,
  ].filter(Boolean);

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
