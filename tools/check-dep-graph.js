// @ts-check
const { createProjectGraphAsync } = require('@nrwl/workspace/src/core/project-graph');

main().catch(err => {
  console.error(err);
  process.exit(1);
});

/**
 * temporary integration check to mitigate AST parsing errors that cause invalid dependency tree creation
 * @see https://github.com/nrwl/nx/issues/8938
 */
async function main() {
  const graph = await createProjectGraphAsync();

  const toolsDeps = graph.dependencies['@fluentui/nx-workspace-tools'].reduce(
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
      `🚨 Somethings wrong with dependency graph!
       ========
       @fluentui/nx-workspace-tools should not rely on any libraries within monorepo, but it depends on:
        ${JSON.stringify(toolsDeps.own, null, 2)}\n`,
    );
  }
}
