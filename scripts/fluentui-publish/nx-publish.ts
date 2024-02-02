/* eslint-disable @typescript-eslint/no-shadow */
import { execSync } from 'node:child_process';

import { tree } from '@fluentui/scripts-monorepo';
import {
  NxJsonConfiguration,
  type ProjectGraph,
  type ProjectGraphProjectNode,
  Tree,
  joinPathFragments,
  output,
  readCachedProjectGraph,
  readJsonFile,
  readNxJson,
  readProjectsConfigurationFromProjectGraph,
  updateJson,
  workspaceRoot,
} from '@nx/devkit';
import { releasePublish, releaseVersion } from 'nx/release';
import { getGeneratorInformation } from 'nx/src/command-line/generate/generator-utils';
import { getLatestGitTagForPattern, gitAdd, gitPush, gitTag } from 'nx/src/command-line/release/utils/git';
import { printAndFlushChanges } from 'nx/src/command-line/release/utils/print-changes';
import { interpolate } from 'nx/src/tasks-runner/utils';
import * as yargs from 'yargs';

type NxReleaseVersionResult = Awaited<ReturnType<typeof releaseVersion>>;
type NxReleaseVersionArgs = Parameters<typeof releaseVersion>[0];
type NxReleasePublishArgs = Parameters<typeof releasePublish>[0];

export async function main() {
  const { options, command, specifier } = processArgs();

  const graph = readCachedProjectGraph();
  const nxConfig = readNxJson(tree);
  const northstarGroup = getNorthstarGroup(graph);

  if (!nxConfig) {
    throw new Error('nx.json doesnt exist at root of workspace');
  }

  if (command === 'version') {
    await version({ args: { specifier, ...options } as VersionArgs, graph, group: northstarGroup });
    process.exit(0);
  }

  if (command === 'publish') {
    await publish({ args: options as VersionArgs, group: northstarGroup, nxConfig });
    process.exit(0);
  }

  throw new Error('unknown command specified');
}

function processArgs() {
  const args = yargs
    .version(false) // don't use the default meaning of version in yargs
    .scriptName('northstar-release')
    .command('version', 'bump version', _yargs => {
      yargs
        .positional('specifier', {
          description: 'Explicit version specifier to use, if overriding conventional commits',
          type: 'string',
          demandOption: true,
        })
        .option('dryRun', {
          alias: 'd',
          description: 'Whether or not to perform a dry-run of the release process, defaults to false',
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: 'Whether or not to enable verbose logging, defaults to false',
          type: 'boolean',
          default: false,
        });
    })
    .command('publish', 'publish version to npm', _yargs => {
      yargs
        .option('dryRun', {
          alias: 'd',
          description: 'Whether or not to perform a dry-run of the release process, defaults to false',
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: 'Whether or not to enable verbose logging, defaults to false',
          type: 'boolean',
          default: false,
        });
    })
    .demandCommand()
    .strict()
    .help().argv;

  const { _, $0, ...options } = args;
  const [command, specifier] = _;

  return { command, options, specifier };
}

type PublishArgs = Required<Pick<NxReleasePublishArgs, 'dryRun' | 'verbose'>>;
export async function publish(config: {
  args: PublishArgs;
  group: ReturnType<typeof getNorthstarGroup>;
  nxConfig: NxJsonConfiguration;
}) {
  const { args, group, nxConfig } = config;

  await tagRelease();

  await releasePublish({
    dryRun: args.dryRun,
    verbose: args.verbose,
    registry: 'https://registry.npmjs.org',
    groups: ['northstar'],
  });

  process.exit(0);

  // ======= utils ========

  async function tagRelease() {
    const TAG_PATTERN = nxConfig.release?.groups?.northstar.releaseTagPattern;

    if (!TAG_PATTERN) {
      throw new Error('northstar group definition is missing "releaseTagPattern"');
    }

    const latestTag = await getLatestGitTagForPattern(TAG_PATTERN);
    const newWorkspaceVersion = getNewFixedVersion(group.lib);

    if (latestTag?.extractedVersion === newWorkspaceVersion) {
      output.logSingleLine(`tag:${latestTag?.tag} already exist, skipping tagging`);
      return;
    }

    const tag = interpolate(TAG_PATTERN, { version: ' ', projectName: ' ' }).trim() + newWorkspaceVersion;

    await gitTag({ tag, dryRun: args.dryRun });

    if (!args.dryRun) {
      await gitPush();
    } else {
      output.logSingleLine(`Would push tag:${tag} to remote origin`);
    }
  }
  function getNewFixedVersion(projects: { [projectName: string]: ProjectGraphProjectNode }) {
    const updatedLibProjectName = Object.keys(projects)[0];
    const updatedLibProject = projects[updatedLibProjectName];
    const pkgJsonPath = joinPathFragments(workspaceRoot, updatedLibProject.data.root, 'package.json');
    const json = readJsonFile(pkgJsonPath);

    return json.version;
  }
}

type VersionArgs = Required<Pick<NxReleaseVersionArgs, 'dryRun' | 'verbose' | 'specifier'>>;

export async function version(config: {
  args: VersionArgs;
  graph: ProjectGraph;
  group: ReturnType<typeof getNorthstarGroup>;
}) {
  const { args, group, graph } = config;

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: args.specifier,
    stageChanges: true,
    groups: ['northstar'],
    dryRun: args.dryRun,
    verbose: args.verbose,
  });

  if (!workspaceVersion) {
    throw new Error(`workspaceVersion is empty. Something is wrong with nx release config or implementation changed`);
  }

  updateCrossReleaseGroupDependency(tree, { args, projectsVersionData, group });

  await runWorkspaceGenerators(tree, graph, args);

  printAndFlushChanges(tree, args.dryRun);

  await stageChanges(tree, args);

  runChangeTask(args);
}

// ========

function updateCrossReleaseGroupDependency(
  tree: Tree,
  options: {
    args: VersionArgs;
    projectsVersionData: NxReleaseVersionResult['projectsVersionData'];
    group: ReturnType<typeof getNorthstarGroup>;
  },
) {
  for (const projectConfig of Object.values(options.group.crossBoundaryProjects)) {
    const projectRoot = projectConfig.data.root;
    const projectPackageJsonPath = joinPathFragments(projectRoot, 'package.json');

    updateJson(tree, projectPackageJsonPath, json => {
      updateDeps(json);

      return json;
    });
  }

  function updateDeps(json: { dependencies?: Record<string, string>; peerDependencies?: Record<string, string> }) {
    for (const [groupProjectName, data] of Object.entries(options.projectsVersionData)) {
      if (json.dependencies && json.dependencies[groupProjectName]) {
        json.dependencies[groupProjectName] = `^${data.newVersion}`;
      }

      if (json.peerDependencies && json.peerDependencies[groupProjectName]) {
        json.peerDependencies[groupProjectName] = `^${data.newVersion}`;
      }
    }
  }
}

async function runWorkspaceGenerators(tree: Tree, graph: ProjectGraph, config: { dryRun: boolean }) {
  const collectionName = '@fluentui/workspace-plugin';
  const generators = ['normalize-package-dependencies'];
  output.logSingleLine(`running workspace generator to normalize dependency versions:`);

  const projects = readProjectsConfigurationFromProjectGraph(graph);

  const generatorPromises = generators.map(async generatorName => {
    console.log(`-  ${collectionName}:${generatorName}`);

    const generatorData = getGeneratorInformation(collectionName, generatorName, workspaceRoot, projects.projects);

    const generatorFactory = generatorData.implementationFactory();

    await generatorFactory(tree, {});
  });

  await Promise.all(generatorPromises);
}

function runChangeTask(config: { dryRun: boolean }) {
  const { dryRun } = config;
  const message = dryRun
    ? `Would generate change-files (for packages outside release group) but --dry-run was set:`
    : `Generating change-files (for packages outside release group)`;
  const cmd = `yarn change --message 'chore: bump northstar version' --type patch`;

  output.logSingleLine(message);

  if (dryRun) {
    return;
  }

  execSync(cmd, { stdio: 'inherit' });
}

export function getNorthstarGroup(graph: ProjectGraph) {
  const projectEntries = Object.entries(graph.nodes);
  const northstarProjects = projectEntries.reduce(
    (acc, [projectName, projectConfig]) => {
      const tags = projectConfig.data.tags ?? [];
      if (!tags.includes('react-northstar')) {
        return acc;
      }

      if (tags.includes('vNext')) {
        acc.crossBoundaryProjects[projectName] = projectConfig;
        return acc;
      }

      if (projectConfig.type !== 'lib') {
        acc.app[projectName] = projectConfig;
        return acc;
      }

      acc.lib[projectName] = projectConfig;

      return acc;
    },
    {
      lib: {} as { [projectName: string]: ProjectGraphProjectNode },
      app: {} as { [projectName: string]: ProjectGraphProjectNode },
      crossBoundaryProjects: {} as { [projectName: string]: ProjectGraphProjectNode },
    },
  );

  return northstarProjects;
}

async function stageChanges(tree: Tree, args: { dryRun: boolean; verbose: boolean }) {
  output.logSingleLine(`Staging changed files with git because --stage-changes was set`);

  await gitAdd({
    changedFiles: tree.listChanges().map(f => f.path),
    dryRun: args.dryRun,
    verbose: args.verbose,
    logFn: console.log,
  });
}
