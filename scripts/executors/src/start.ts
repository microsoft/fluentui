// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- cannot import .d.ts as that is causing failures within ts-node/register
/// <reference types="./enquirer-types.d.ts" />

import { spawnSync } from 'node:child_process';

import { ProjectGraphProjectNode, createProjectGraphAsync, output } from '@nx/devkit';
import { AutoComplete } from 'enquirer';

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

main().catch(e => {
  console.error(e);
  process.exit(1);
});

// ========================

function welcome() {
  output.log({
    title: output.bold('Welcome to Fluent UI'.toUpperCase()),
    bodyLines: [
      'This is our "nx-console" cli alternative to run common tasks for the selected project.',
      '',
      `${output.bold(
        '💡 Tip 1',
      )}: we use 'nx(https://nx.dev)' as a task runner, so you can run any task by typing 'nx run <project>:<target>'.`,
      `${output.bold(
        '💡 Tip 2',
      )}: to get available options for a project target, invoke 'nx run <project>:<target>' with additional '--help' flag.`,
    ],
    color: 'cyan',
  });
}

async function main() {
  welcome();

  const graph = await createProjectGraphAsync();
  const allProjects = graph.nodes;

  const selectedProject = await getSelectedProject(allProjects);
  const selectedTarget = await getSelectedTarget(allProjects, selectedProject);

  if (selectedTarget === 'help') {
    spawnSync('nx', ['show', 'project', selectedProject], {
      shell: true,
      stdio: 'inherit',
    });

    process.exit(0);
  }

  const cmd = `${selectedProject}:${selectedTarget}`;

  output.logSingleLine(`Running nx run ${cmd}`);

  spawnSync('nx', ['run', cmd], {
    shell: true,
    stdio: 'inherit',
  });
}

async function getSelectedProject(projects: Record<string, ProjectGraphProjectNode>): Promise<string> {
  const availableProjectNames = Object.keys(projects);
  const longestProjectName = getLongestStringValue(availableProjectNames);
  const projectChoices = availableProjectNames.map(projectName => ({
    name: formatTargetOutput(projectName, createDescription(projects[projectName]), longestProjectName),
    value: projectName,
  }));

  const heading = formatTargetOutput(
    'Project Name',
    '   Type   /      Scope      /      Access      ',
    longestProjectName,
  );

  const projectPrompt = new AutoComplete({
    name: 'project',
    message: 'Select project to run',
    choices: projectChoices,
    limit: 10,
    suggest: (typed, choices) => {
      const matches = choices.filter(choice => choice.value.includes(typed));
      return matches.length ? matches : [];
    },
    header: ['='.repeat(heading.length), `${heading}`, '='.repeat(heading.length)].join('\n'),
    footer: () => {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  return projectPrompt.run();

  function createDescription(projectConfig: ProjectGraphProjectNode) {
    if (projectConfig.name === 'fluentui-repo') {
      return 'monorepo root';
    }

    const tags = projectConfig.data.tags ?? [];

    const access = tags.includes('npm:private') ? 'private' : 'published';
    const projectScope = getProjectScope(tags) + (tags.includes('tools') ? ' (tool)' : '');
    const projectType = projectConfig.data.projectType;

    return `${projectType} / ${projectScope} / ${access}`;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    function getProjectScope(tags: string[]) {
      if (tags.includes('vNext')) {
        return 'react-components (v9)';
      }
      if (tags.includes('v8')) {
        return 'react (v8)';
      }
      if (tags.includes('react-northstar')) {
        return 'react-northstar (v0)';
      }
      if (tags.includes('web-components')) {
        return 'web-components';
      }

      return '';
    }
  }
}

async function getSelectedTarget(
  projects: Record<string, ProjectGraphProjectNode>,
  selectedProject: string,
): Promise<string> {
  const projectTargets = projects[selectedProject].data.targets ?? {};

  const availableTargets = Object.keys(projectTargets)
    .filter(targetName => {
      return omitTargets.includes(targetName) ? false : true;
    })
    .concat('help') as Array<keyof typeof targetDescription>;

  const targetChoices = availableTargets.map(targetName => ({
    name: formatTargetOutput(
      targetName,
      createTaskDescription(targetName, projectTargets),
      getLongestStringValue(availableTargets),
    ),
    value: targetName,
  }));

  const targetPrompt = new AutoComplete({
    name: 'target',
    message: 'Select target to run',
    choices: targetChoices,
    limit: 5,
    footer() {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  return targetPrompt.run();

  function createTaskDescription(
    targetName: keyof typeof targetDescription,
    targetsMetadata: NonNullable<ProjectGraphProjectNode['data']['targets']>,
  ) {
    const description = targetDescription[targetName];
    const nxTargetConfiguration = targetsMetadata[targetName];

    if (!nxTargetConfiguration) {
      return description;
    }

    if (targetName === 'start') {
      const scriptContent = nxTargetConfiguration.metadata?.scriptContent;
      if (scriptContent.includes('storybook')) {
        return `Start the project (Alias of "storybook" target)`;
      }
      return description;
    }

    if (targetName === 'e2e') {
      const scriptContent = nxTargetConfiguration.metadata?.scriptContent;
      const runnerType = getRunnerType(scriptContent);
      return description + ` (using ${runnerType})`;
    }

    return description ?? nxTargetConfiguration.metadata?.scriptContent;

    function getRunnerType(scriptContent: string): 'cypress' | 'playwright' {
      if (scriptContent.includes('cypress')) {
        return 'cypress';
      }
      if (scriptContent.includes('playwright')) {
        return 'playwright';
      }
      throw new Error('invalid runner type');
    }
  }
}

function formatTargetOutput(value: string, description: string, longestStringCharCount: number) {
  const padding = ' '.repeat(longestStringCharCount - value.length);
  return `${value}${padding} - ${description}`;
}
function getLongestStringValue(values: string[]) {
  return values.reduce((acc, value) => {
    return value.length > acc ? value.length : acc;
  }, 0);
}
