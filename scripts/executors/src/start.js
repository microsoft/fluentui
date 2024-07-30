const { spawnSync } = require('node:child_process');

const { workspaceRoot, output } = require('@nx/devkit');
const { AutoComplete } = require('enquirer');

const targetDescription = {
  build: 'transpile source TS to JS',
  'bundle-size': 'check the bundle size diff',
  bundle: 'bundle source with webpack',
  storybook: 'start storybook in dev mode',
  'build-storybook': 'build production version of storybook',
  'generate-api': 're-generate api.md (using api-extractor)',
  lint: 'validate code with eslint',
  'type-check': 'validate type correctness via TypeScript',
  test: 'run jest tests ',
  'test-integration': 'run integration tests (using @fluentui/scripts-projects-test)',
  'test-ssr': 'run server-side rendering tests (using @fluentui/scripts-test-ssr)',
  'test-vr': 'run visual regression tests (using storywright)',
  'test-perf': 'run performance tests',
  e2e: 'run e2e/component tests for the project',
  'verify-packaging': 'verify packaging assets that will be shipped to npm',
  // non default targets
  format: 'format code with prettier',
  'code-style': 'format code with prettier and run eslint',
  clean: 'remove build artifacts',
  start: 'start the project',
  help: 'show project help',
};

const omitTargets = ['nx-release-publish', 'just'];

async function main() {
  /**
   * @type {string[]}
   */
  const allProjects = JSON.parse(
    spawnSync('nx', ['show', 'projects', '--json'], { cwd: workspaceRoot }).stdout.toString(),
  );
  const extraArgs = process.argv.slice(2) ?? [];

  const projectPrompt = new AutoComplete({
    name: 'project',
    message: 'Select project to start',
    choices: allProjects,
    limit: 10,
    footer() {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  /** @type {string} */
  const selectedProject = await projectPrompt.run();

  const projectTargets = JSON.parse(
    spawnSync('nx', ['show', 'project', selectedProject, '--json'], { cwd: workspaceRoot }).stdout.toString(),
  );

  const availableTargets = /** @type {Array<keyof typeof  targetDescription>} */ (
    Object.keys(projectTargets.targets).filter(targetName => {
      return omitTargets.includes(targetName) ? false : true;
    })
  ).concat('help');

  const longestTargetName = availableTargets.reduce((acc, targetName) => {
    return targetName.length > acc ? targetName.length : acc;
  }, 0);

  const targetChoices = availableTargets.map(targetName => ({
    name: formatTargetOutput(targetName, createTaskDescription(targetName, projectTargets.targets)),
    value: targetName,
  }));

  const targetPrompt = new AutoComplete({
    name: 'target',
    message: 'Select target to start',
    choices: targetChoices,
    limit: 5,
    footer() {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  /** @type {string} */
  const selectedTarget = await targetPrompt.run();

  /**
   *
   * @param {string} targetName
   * @param {string} description
   */
  function formatTargetOutput(targetName, description) {
    const padding = ' '.repeat(longestTargetName - targetName.length);
    return `${targetName}${padding} - ${description}`;
  }

  /**
   *
   * @param {keyof typeof  targetDescription} targetName
   * @param {{[targetName:string]:{metadata:{executor:string;scriptContent:string;runCommand:string}}}} targetsMetadata
   * @returns
   */
  function createTaskDescription(targetName, targetsMetadata) {
    const description = targetDescription[targetName];
    const nxTargetDefinition = targetsMetadata[targetName];

    if (!nxTargetDefinition) {
      return description;
    }

    if (targetName === 'start') {
      const scriptContent = nxTargetDefinition.metadata.scriptContent;
      if (scriptContent.includes('storybook')) {
        return `Start the project (Alias of "storybook" target)`;
      }
      return description;
    }

    if (targetName === 'e2e') {
      const scriptContent = nxTargetDefinition.metadata.scriptContent;
      const runnerType = getRunnerType(scriptContent);
      return description + ` (using ${runnerType})`;
    }

    return description ?? nxTargetDefinition.metadata.scriptContent;

    /**
     * @param {string} scriptContent
     * @returns {'cypress' | 'playwright'}
     */
    function getRunnerType(scriptContent) {
      if (scriptContent.includes('cypress')) {
        return 'cypress';
      }
      if (scriptContent.includes('playwright')) {
        return 'playwright';
      }
      throw new Error('invalid runner type');
    }
  }

  if (selectedTarget === 'help') {
    spawnSync('nx', ['show', 'project', selectedProject], {
      shell: true,
      stdio: 'inherit',
    });

    process.exit(0);
  }

  const cmd = `${selectedProject}:${selectedTarget}`;

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
