const { spawnSync } = require('node:child_process');

const { workspaceRoot, output } = require('@nx/devkit');
const prompts = require('prompts');

const targetDescription = {
  build: 'Build the project',
  'bundle-size': 'Check the bundle size diff of the project',
  bundle: 'Bundle the project with webpack',
  storybook: 'Start storybook for the project',
  'build-storybook': 'Build production version of storybook for project',
  'generate-api': 're-generate projects api.md',
  lint: 'Run eslint on the project',
  'type-check': 'type-check the project',
  test: 'Run tests for the project',
  'test-integration': 'Run integration tests for the project',
  'test-ssr': 'Run server-side rendering tests for the project',
  'test-vr': 'Run visual regression tests for the project',
  'test-perf': 'Run performance tests for the project',
  e2e: 'Run e2e/component tests for the project (cypress)',
  'verify-packaging': 'Verify npm packaging of the project',
  start: 'Start the project',
};

const omitTargets = ['nx-release-publish', 'just'];

/**
 * @type {string[]}
 */
const allProjects = JSON.parse(
  spawnSync('nx', ['show', 'projects', '--json'], { cwd: workspaceRoot }).stdout.toString(),
);
const extraArgs = process.argv.slice(2) ?? [];

/**
 *
 * @param {string} input
 * @param {import('prompts').Choice[]} choices
 */
const suggest = (input, choices) => Promise.resolve(choices.filter(i => i.title.includes(input)));

async function main() {
  const projectPrompt = await prompts({
    type: 'autocomplete',
    name: 'project',

    message: 'Which project to start (select or type partial name)?',
    suggest,
    choices: [...allProjects.map(p => ({ title: p }))],
  });

  const projectTargets = JSON.parse(
    spawnSync('nx', ['show', 'project', projectPrompt.project, '--json'], { cwd: workspaceRoot }).stdout.toString(),
  );

  const availableTargets = /** @type {Array<keyof typeof  targetDescription>} */ (
    Object.keys(projectTargets.targets).filter(targetName => {
      return omitTargets.includes(targetName) ? false : true;
    })
  );

  const targetPrompt = await prompts({
    type: 'autocomplete',
    name: 'target',

    message: 'Which target to start (select or type partial name)?',
    suggest,
    choices: [
      ...availableTargets.map(targetName => ({
        title: targetName,
        description: createTaskDescription(targetName, projectTargets.targets),
      })),
    ],
  });

  /**
   *
   * @param {keyof typeof  targetDescription} targetName
   * @param {{[targetName:string]:{metadata:{executor:string;scriptContent:string;runCommand:string}}}} targetsMetadata
   * @returns
   */
  function createTaskDescription(targetName, targetsMetadata) {
    if (targetName === 'start') {
      const startTarget = targetsMetadata[targetName];
      const scriptContent = startTarget.metadata.scriptContent;
      if (scriptContent.includes('storybook')) {
        return `Start the project (Alias of "storybook" target)`;
      }
      return targetDescription[targetName];
    }

    return targetDescription[targetName];
  }

  const cmd = `${projectPrompt.project}:${targetPrompt.target}`;

  output.logSingleLine(`Running nx run ${cmd} ${extraArgs.join(' ')}`);

  spawnSync('nx', ['run', cmd, ...extraArgs], {
    shell: true,
    stdio: 'inherit',
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
