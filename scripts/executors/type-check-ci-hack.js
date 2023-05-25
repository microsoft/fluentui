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
  const affected = getAffectedPackages(base);
  const tree = new FsTree(workspaceRoot, false);

  const needsReactComponentsDts = Array.from(affected).some(projectName => {
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

  if (needsReactComponentsDts) {
    console.info(
      '',
      '💁: generating .d.ts files first for @fluentui/react-components, in order to drastically speed up type-check command for v9 packages !',
      '',
    );
    execSync('yarn lage build --to @fluentui/react-components');
  }
}
