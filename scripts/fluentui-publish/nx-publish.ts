/* eslint-disable @typescript-eslint/no-shadow */
import { execSync } from 'node:child_process';

import { flushTreeChanges, tree } from '@fluentui/scripts-monorepo';
import {
  NxJsonConfiguration,
  type ProjectGraph,
  type ProjectGraphProjectNode,
  Tree,
  joinPathFragments,
  output,
  readCachedProjectGraph,
  readJson,
  readJsonFile,
  readNxJson,
  updateJson,
  workspaceRoot,
  writeJson,
} from '@nx/devkit';
import { releasePublish, releaseVersion } from 'nx/src/command-line/release';
import { getLatestGitTagForPattern, gitPush, gitTag } from 'nx/src/command-line/release/utils/git';
import { interpolate } from 'nx/src/tasks-runner/utils';
import * as yargs from 'yargs';

type NxReleaseVersionResult = Awaited<ReturnType<typeof releaseVersion>>;
type NxReleaseVersionArgs = Parameters<typeof releaseVersion>[number];
type NxReleasePublishArgs = Parameters<typeof releasePublish>[number];

async function main() {
  const { options, command } = processArgs();

  const graph = readCachedProjectGraph();
  const nxConfig = readNxJson(tree);
  const northstarGroup = getNorthstarGroup(graph);

  if (!nxConfig) {
    throw new Error('nx.json doesnt exist at root of workspace');
  }

  if (command === 'version') {
    await version({ args: options as VersionArgs, graph, group: northstarGroup });
    process.exit(0);
  }

  if (command === 'publish') {
    await publish({ args: options as VersionArgs, group: northstarGroup, nxConfig });
    process.exit(0);
  }

  // await releasePublish({});
  throw new Error('unknown command specified');
}

function processArgs() {
  const args = yargs
    .version(false) // don't use the default meaning of version in yargs
    .scriptName('northstar-release')
    .command('version', 'bump version', _yargs => {
      yargs
        .option('specifier', {
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
  const command = _[0];

  return { command, options };
}

type PublishArgs = Required<Pick<NxReleasePublishArgs, 'dryRun' | 'verbose'>>;
async function publish(config: {
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
}

type VersionArgs = Required<Pick<NxReleaseVersionArgs, 'dryRun' | 'verbose' | 'specifier'>>;

async function version(config: {
  args: VersionArgs;
  graph: ProjectGraph;
  group: ReturnType<typeof getNorthstarGroup>;
}) {
  const { args, graph, group } = config;

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

  fixVersionRanges(tree, { graph, projectsVersionData });
  updateCrossReleaseGroupDependency(tree, { projectsVersionData, group });

  if (!args.dryRun) {
    flushTreeChanges();
  }

  normalizeDependencies(args);

  stageChanges(tree, args);

  if (!args.dryRun) {
    runChange();
  }
}

// ========

function updateCrossReleaseGroupDependency(
  tree: Tree,
  options: {
    projectsVersionData: NxReleaseVersionResult['projectsVersionData'];
    group: ReturnType<typeof getNorthstarGroup>;
  },
) {
  const updateProjects: string[] = [];

  for (const projectConfig of Object.values(options.group.crossBoundaryProjects)) {
    const projectRoot = projectConfig.data.root;

    updateJson(tree, joinPathFragments(projectRoot, 'package.json'), json => {
      updateDeps(json);
      return json;
    });
    updateProjects.push(`- ${projectConfig.name}`);
  }

  output.log({ title: `Updating package dependencies outside release group:`, bodyLines: updateProjects });

  function updateDeps(json: { dependencies: Record<string, string> }) {
    for (const [groupProjectName, data] of Object.entries(options.projectsVersionData)) {
      if (json.dependencies[groupProjectName]) {
        json.dependencies[groupProjectName] = `^${data.newVersion}`;
      }
    }
  }
}

function normalizeDependencies(config: { dryRun: boolean }) {
  output.logSingleLine(`running workspace generator to normalize dependency versions:`);

  const generators = ['dependency-mismatch', 'normalize-package-dependencies'];
  generators.forEach(generator => {
    const dryRun = config.dryRun ? '-d' : '';
    const cmd = `yarn nx g @fluentui/workspace-plugin:${generator} ${dryRun}`.trim();
    execSync(cmd, { stdio: 'inherit' });
  });
}

function runChange() {
  output.logSingleLine(`generating change-files (for packages outside release group):`);
  const cmd = `yarn change --message 'chore: bump northstar version' --type patch`;

  execSync(cmd, { stdio: 'inherit' });
}

/**
 *
 * @see https://github.com/nrwl/nx/issues/21044
 */
function fixVersionRanges(
  tree: Tree,
  options: {
    graph: ProjectGraph;
    projectsVersionData: NxReleaseVersionResult['projectsVersionData'];
  },
) {
  const { projectsVersionData, graph } = options;
  const projectsToUpdate: { [projectName: string]: { depNameToFix: Set<string>; pkgJsonPath: string } } = {};

  for (const [versionedProjectName, versionedProjectData] of Object.entries(projectsVersionData)) {
    versionedProjectData.dependentProjects.forEach(dependentProject => {
      if (!projectsToUpdate[dependentProject.source]) {
        projectsToUpdate[dependentProject.source] = { pkgJsonPath: '', depNameToFix: new Set() };
      }

      projectsToUpdate[dependentProject.source].pkgJsonPath = projectsToUpdate[dependentProject.source].pkgJsonPath
        ? projectsToUpdate[dependentProject.source].pkgJsonPath
        : joinPathFragments(graph.nodes[dependentProject.source].data.root, 'package.json');

      projectsToUpdate[dependentProject.source].depNameToFix.add(versionedProjectName);
    });
  }

  for (const val of Object.values(projectsToUpdate)) {
    const json = readJson(tree, val.pkgJsonPath);
    for (const [depName, depVersion] of Object.entries(json.dependencies)) {
      if (val.depNameToFix.has(depName)) {
        json.dependencies[depName] = `^${depVersion}`;
      }
    }
    writeJson(tree, val.pkgJsonPath, json);
  }
}

function getNewFixedVersion(projects: { [projectName: string]: ProjectGraphProjectNode }) {
  const updatedLibProjectName = Object.keys(projects)[0];
  const updatedLibProject = projects[updatedLibProjectName];
  const pkgJsonPath = joinPathFragments(workspaceRoot, updatedLibProject.data.root, 'package.json');
  const json = readJsonFile(pkgJsonPath);

  return json.version;
}

function getNorthstarGroup(graph: ProjectGraph) {
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

main().catch(reason => {
  console.error(reason);
  throw new Error(reason);
});

async function stageChanges(tree: Tree, args: { dryRun: boolean; verbose: boolean }) {
  const changedFiles = tree.listChanges().map(f => f.path);
  output.logSingleLine(`Staging changed files with git because --stage-changes was set`);
  gitAdd({
    changedFiles,
    dryRun: args.dryRun,
    verbose: args.verbose,
  });
}

function gitAdd(options: { changedFiles: string[]; dryRun: boolean; verbose: boolean }) {
  const logFn = console.log;
  const { changedFiles, dryRun, verbose } = options;
  const commandArgs = ['add', ...changedFiles];
  const cmd = `git ${commandArgs.join(' ')}`;
  const message = dryRun
    ? `Would stage files in git with the following command, but --dry-run was set:`
    : `Staging files in git with the following command:`;
  if (verbose) {
    logFn(message);
    logFn(`git ${commandArgs.join(' ')}`);
  }
  if (dryRun) {
    return;
  }

  return execSync(cmd, { stdio: 'inherit' });
}
