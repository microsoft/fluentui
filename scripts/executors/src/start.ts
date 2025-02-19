// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- cannot import .d.ts as that is causing failures within ts-node/register
/// <reference types="./enquirer-types.d.ts" />

import { spawnSync } from 'node:child_process';

import { createProjectGraphAsync, output } from '@nx/devkit';
import type { ProjectGraph, ProjectGraphProjectNode } from '@nx/devkit';
import type { Choice } from 'enquirer';
import { AutoComplete } from 'enquirer';

const projectTitleDefault = 'Fluent UI';
const repoNpmNameDefault = 'fluentui-repo';
const projectHeaderDefault = {
  projectNameCell: 'Project Name',
  descriptionCell: '   Type   /      Scope      /      Access      ',
};
const defaultTargetDescription = {
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
  // non default targets - not defined in nx.json
  format: 'format code with prettier',
  'code-style': 'format code with prettier and run eslint',
  clean: 'remove build artifacts',
  start: 'start the project',
  // special target to trigger `nx show project <project>` cmd
  help: 'show project help',
};
const defaultOmitTargets = ['nx-release-publish'];

main().catch(e => {
  console.error(e);
  process.exit(1);
});

async function main() {
  await cli({
    projectTitle: projectTitleDefault,
    projectHeader: projectHeaderDefault,
    omitTargets: [...defaultOmitTargets, 'just'],
    projectDescriptionFactory: createProjectDescription,
    targetDescriptionFactory: createTargetDescription,
    preselectTargetFactory: createPreselectedTarget,
  });
}

// ========================
type ProjectHeader = { projectNameCell: string; descriptionCell: string };
type PreselectTargetFn = (projectConfig: ProjectGraphProjectNode) => string | null;
type ProjectDescriptionFn = (projectConfig: ProjectGraphProjectNode) => string;
type TargetDescriptionFn = (
  projectConfig: ProjectGraphProjectNode,
  targetName: string,
  targetsDescription: Record<string, string>,
) => string;

export async function cli(options: {
  graph?: ProjectGraph;
  projectTitle: string;
  projectHeader?: ProjectHeader;
  targetsDescription?: Record<string, string>;
  omitTargets?: string[];
  projectDescriptionFactory: ProjectDescriptionFn;
  targetDescriptionFactory: TargetDescriptionFn;
  preselectTargetFactory: PreselectTargetFn;
}) {
  const {
    graph = await createProjectGraphAsync(),
    projectTitle,
    projectHeader,
    targetsDescription = defaultTargetDescription,
    omitTargets = defaultOmitTargets,
    projectDescriptionFactory,
    targetDescriptionFactory,
    preselectTargetFactory,
  } = options;

  const allProjects = graph.nodes;

  welcome(projectTitle);

  const selectedProject = await getSelectedProject(allProjects, projectHeader, projectDescriptionFactory);
  const selectedTarget = await getSelectedTarget(
    allProjects,
    selectedProject,
    targetsDescription,
    omitTargets,
    targetDescriptionFactory,
    preselectTargetFactory,
  );

  if (selectedTarget === 'help') {
    runCommand('nx', ['show', 'project', selectedProject]);
    return;
  }

  const cmd = `${selectedProject}:${selectedTarget}`;

  output.logSingleLine(`Running 'nx run ${cmd}'`);

  runCommand('nx', ['run', cmd]);
}

function welcome(title: string) {
  output.log({
    title: output.bold(`Welcome to ${title}`.toUpperCase()),
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

async function getSelectedProject(
  projects: Record<string, ProjectGraphProjectNode>,
  projectHeader: ProjectHeader | undefined,
  createDescription: ProjectDescriptionFn,
): Promise<string> {
  const availableProjectNames = Object.keys(projects);
  const longestProjectName = getLongestStringValue(availableProjectNames);
  const projectChoices = availableProjectNames.map(projectName => ({
    name: formatOutput(projectName, createDescription(projects[projectName]), longestProjectName),
    value: projectName,
  }));

  const heading = projectHeader
    ? formatOutput(projectHeader.projectNameCell, projectHeader.descriptionCell, longestProjectName)
    : null;
  const header = heading ? [heading, '-'.repeat(heading.length)].join('\n') : undefined;

  const projectPrompt = new AutoComplete({
    name: 'project',
    message: 'Select project to run',
    choices: projectChoices,
    limit: 10,
    suggest,
    header,
    footer: () => {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  return projectPrompt.run();
}

function createProjectDescription(projectConfig: ProjectGraphProjectNode) {
  if (projectConfig.name === repoNpmNameDefault) {
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

async function getSelectedTarget(
  projects: Record<string, ProjectGraphProjectNode>,
  selectedProject: string,
  targetsDescription: Record<string, string>,
  omitTargets: string[],
  createDescription: TargetDescriptionFn,
  preselectTarget: PreselectTargetFn,
): Promise<string> {
  const projectConfig = projects[selectedProject];
  const projectTargets = projectConfig.data.targets ?? {};
  const preselectedTarget = preselectTarget(projectConfig);

  const availableTargets = Object.keys(projectTargets)
    .filter(targetName => {
      return omitTargets.includes(targetName) ? false : true;
    })
    .map(targetName => {
      const targetConfigurations = Object.keys(projectTargets[targetName].configurations || {});

      if (targetConfigurations) {
        return [targetName, ...targetConfigurations.map(target => `${targetName}:${target}`)];
      }

      return targetName;
    })
    .flat()
    .sort()
    .concat('help');

  const preselectedTargetChoice =
    preselectedTarget && availableTargets.indexOf(preselectedTarget) !== -1
      ? availableTargets.indexOf(preselectedTarget)
      : 0;

  const targetChoices = availableTargets.map(targetName => ({
    name: formatOutput(
      targetName,
      createDescription(projectConfig, targetName, targetsDescription),
      getLongestStringValue(availableTargets),
    ),
    value: targetName,
  }));

  const targetPrompt = new AutoComplete({
    name: 'target',
    message: 'Select target to run',
    choices: targetChoices,
    initial: preselectedTargetChoice,
    suggest,
    limit: targetChoices.length,
    footer() {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  });

  return targetPrompt.run();
}

function createPreselectedTarget(projectConfig: ProjectGraphProjectNode) {
  const projectTargets = projectConfig.data.targets;

  if (!projectTargets) {
    return null;
  }

  const isNode = projectConfig.data.tags?.includes('platform:node');
  const hasTestTarget = Boolean(projectTargets.test);
  const isWeb = projectConfig.data.tags?.includes('platform:web');
  const hasStorybookTarget = Boolean(projectTargets.storybook);

  if (isWeb && hasStorybookTarget) {
    return 'storybook';
  }

  if (isNode && hasTestTarget) {
    return 'test';
  }

  return null;
}

function createTargetDescription(
  projectConfig: ProjectGraphProjectNode,
  targetName: string,
  targetsDescription: Record<string, string>,
) {
  const manualConfigDrivenDescription = targetsDescription[targetName];
  const nxTargetConfiguration = projectConfig.data.targets?.[targetName];
  const nxMetadataDescription = nxTargetConfiguration?.metadata?.description;
  const scriptContent: string | undefined = nxTargetConfiguration?.metadata?.scriptContent;
  const command = scriptContent || nxTargetConfiguration?.options.command || nxTargetConfiguration?.command;

  // special case for non existent targets that we add artificially like `help`
  if (!nxTargetConfiguration) {
    return manualConfigDrivenDescription;
  }

  if (nxMetadataDescription) {
    return nxMetadataDescription;
  }

  if (targetName === 'start') {
    if (command && command.includes('storybook')) {
      return `Start the project (Alias of "storybook" target)`;
    }

    return manualConfigDrivenDescription;
  }

  if (targetName === 'e2e') {
    const runnerType = command && getRunnerType(command);
    console.log({ runnerType, command });

    return runnerType ? manualConfigDrivenDescription + ` (using ${runnerType})` : manualConfigDrivenDescription;
  }

  return manualConfigDrivenDescription ?? command;

  function getRunnerType(value: string): 'cypress' | 'playwright' | null {
    if (value.includes('cypress')) {
      return 'cypress';
    }
    if (value.includes('playwright')) {
      return 'playwright';
    }

    return null;
  }
}

function formatOutput(value: string, description: string, longestStringCharCount: number) {
  const padding = ' '.repeat(longestStringCharCount - value.length);
  return `${value}${padding} - ${description}`;
}
function getLongestStringValue(values: string[]) {
  return values.reduce((acc, value) => {
    return value.length > acc ? value.length : acc;
  }, 0);
}

/**
 *
 * Filter autocomplete choices based on project name only.
 */
function suggest(typed: string, choices: Array<Choice>) {
  const matches = choices.filter(choice => choice.value.includes(typed));
  return matches.length ? matches : [];
}

function runCommand(command: string, args: string[]) {
  spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
  });
}
