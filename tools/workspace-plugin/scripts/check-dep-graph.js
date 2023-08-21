// @ts-check

const fs = require('fs');
const path = require('path');
const { createProjectGraphAsync, stripIndents, logger } = require('@nx/devkit');

main().catch(err => {
  logger.error(err);
  process.exit(1);
});

/**
 * temporary integration check to mitigate AST parsing errors that cause invalid dependency tree creation
 * @see https://github.com/nrwl/nx/issues/8938
 */
async function main() {
  const graph = await createProjectGraphAsync();
  const workspacePluginConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../project.json'), 'utf-8'));

  const toolsDeps = graph.dependencies[workspacePluginConfig.name].reduce(
    (acc, current) => {
      if (current.target.startsWith('npm:')) {
        acc.npm.push(current.target);
      } else {
        acc.own.push(current.target);
      }
      return acc;
    },
    { npm: /** @type Array<string> */ ([]), own: /** @type Array<string> */ ([]) },
  );

  if (toolsDeps.own.length > 0) {
    throw new Error(
      stripIndents`🚨 Somethings wrong with dependency graph!

       ${workspacePluginConfig.name} should not rely on any libraries within monorepo, but it depends on:
        ${toolsDeps.own.map(depName => `- ${depName}`).join('\n')}`,
    );
  }
}
