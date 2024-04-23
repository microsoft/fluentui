/* eslint-disable @typescript-eslint/no-shadow */
import { execSync } from "node:child_process";

import { tree } from "@fluentui/scripts-monorepo";
import { ChangeType, NxJsonConfiguration, ProjectGraph, StringChange, Tree, applyChangesToString, joinPathFragments, output, readProjectsConfigurationFromProjectGraph, stripIndents, updateJson, workspaceRoot } from "@nx/devkit";
import { releaseVersion } from "nx/release";


import { NorthstarGroup, getGeneratorInformation, getLatestTag, getTagPattern,printAndFlushChanges,stageChanges } from "./utils";

type NxReleaseVersionResult = Awaited<ReturnType<typeof releaseVersion>>;
type NxReleaseVersionArgs = Parameters<typeof releaseVersion>[0];
export type VersionArgs = Required<Pick<NxReleaseVersionArgs, 'dryRun' | 'verbose' | 'specifier'>>;

export async function version(config: {
  args: VersionArgs;
  graph: ProjectGraph;
  group: NorthstarGroup;
  nxConfig: NxJsonConfiguration;
}) {
  const { args, group, graph, nxConfig } = config;

  assertSpecifier(args.specifier);

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

  await changelog(tree, { group, nxConfig, versionData: { workspaceVersion } });

  printAndFlushChanges(tree, args.dryRun);

  await stageChanges(tree, args);

  runChangeTask(args);
}


// ============

/**
 *
 * This updates Changelog with standard template with new version and github compare diff link
 * NOTE: any kind of actual changes are done by hand
 */
export async function changelog(
  tree: Tree,
  config: {
    group: NorthstarGroup;
    versionData: Pick<Awaited<ReturnType<typeof releaseVersion>>, 'workspaceVersion'>;
    nxConfig: NxJsonConfiguration;
  },
) {
  const { group, versionData, nxConfig } = config;

  const tagPattern = getTagPattern(nxConfig);
  const latestTag = await getLatestTag(tagPattern);
  const previousReleasedVersion = latestTag?.extractedVersion;

  if (!previousReleasedVersion) {
    throw new Error(`No previous release(git tag) for ${tagPattern} was found`);
  }

  const releaseDate = new Date(Date.now())
    .toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');

  const template = stripIndents`
<!--------------------------------[ v${versionData.workspaceVersion} ]------------------------------- -->
## [v${versionData.workspaceVersion}](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v${versionData.workspaceVersion}) (${releaseDate})
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-northstar_v${previousReleasedVersion}..@fluentui/react-northstar_v${versionData.workspaceVersion})
  `;

  const northstarLib = group.lib['@fluentui/react-northstar'];
  const changelogPath = joinPathFragments(northstarLib.data.root, '../CHANGELOG.md');

  if (!tree.exists(changelogPath)) {
    throw new Error(`${changelogPath} doesn't exists`);
  }

  const changelogContent = tree.read(changelogPath, 'utf-8') as string;
  const placeholder = '## [Unreleased]';
  const placeholderPosition = changelogContent?.indexOf(placeholder);

  if (placeholderPosition === -1) {
    throw new Error(`Changelog is missing '${placeholder}'`);
  }

  const changes: StringChange[] = [
    {
      index: placeholderPosition + placeholder.length,
      type: ChangeType.Insert,
      text: `\n\n${template}\n`,
    },
  ];

  const newContents = applyChangesToString(changelogContent, changes);

  tree.write(changelogPath, newContents);
}

export function updateCrossReleaseGroupDependency(
  tree: Tree,
  options: {
    args: VersionArgs;
    projectsVersionData: NxReleaseVersionResult['projectsVersionData'];
    group: NorthstarGroup;
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

function assertSpecifier(specifier: string): asserts specifier is 'patch' | 'minor' {
  const allowedSpecifiers = ['patch', 'minor'];

  if(!allowedSpecifiers.includes(specifier)){
    throw new Error(`your provided specifier: "${specifier}" is not allowed. Please choose one of "${allowedSpecifiers}"`)
  }
}

