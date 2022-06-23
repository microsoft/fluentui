import { getAffectedPackages, getAllPackageInfo, findGitRoot, getNthCommit } from '../monorepo';
import { screenerRunner, cancelScreenerRun } from '../screener/screener.runner';
import { ScreenerRunnerConfig, ScreenerRunnerStep, ScreenerState } from '../screener/screener.types';
import path from 'path';
// @ts-ignore - screener-storybook has no typings
import { startStorybook, getStorybook as screenerGetStorybook } from 'screener-storybook';
import { getStorybook } from '@storybook/react';
/**
 * Starts or cancels a screener run through the screener proxy.
 * Runs are cancelled if package does not appear in Lage's affected package graph.
 */
export async function screener() {
  const screenerConfigPath = path.resolve(process.cwd(), './screener.config.js');
  const screenerConfig: ScreenerRunnerConfig = require(screenerConfigPath);
  console.log('screener config for run');
  console.log(JSON.stringify(screenerConfig, null, 2));
  const screenerStates = await getScreenerStates(screenerConfig);
  screenerConfig.states = screenerStates;

  const packageInfos = getAllPackageInfo();
  const packagePath = path.relative(findGitRoot(), process.cwd());
  const affectedPackageInfo = Object.values(packageInfos).find(x => x.packagePath === packagePath);
  let affectedPackages = new Set<string>();
  const isPrBuild = process.env.BUILD_SOURCEBRANCH && process.env.BUILD_SOURCEBRANCH.includes('refs/pull');

  if (isPrBuild) {
    affectedPackages = getAffectedPackages();
  } else {
    // master CI build,
    const previousMasterCommit = getNthCommit();
    affectedPackages = getAffectedPackages(previousMasterCommit);
  }

  debugAffectedGraph(affectedPackages);

  try {
    if (!affectedPackages.has(affectedPackageInfo.packageJson.name)) {
      await cancelScreenerRun(screenerConfig, 'skipped');
    } else {
      await screenerRunner(screenerConfig);
    }
  } catch (err) {
    console.error('failed to run screener task');
    console.error(err);
    // screener-storybook internally starts a puppeteer instance that only closes on process exist
    process.exit(1);
  }
  process.exit(0);
}

/**
 * Collect all stories and testing steps.
 * This is is run inside a puppeteer instance in screener-runner
 * logic from https://github.com/screener-io/screener-storybook/blob/6198f2ff33af7ba254d635dcfc41398455fd4dd4/src/runner.js#L9
 *
 * @param storybook - storybook object in the browser
 * @param baseUrl - base url of the deployed storybook
 * @returns screen steps
 */
function transformToStates(storybook: ScreenerStorybookSection, baseUrl: string): ScreenerState[] {
  return storybook.reduce<ScreenerState[]>((states, component) => {
    const componentStates = component.stories.map(story => {
      const previewUrl = `${baseUrl}?dataId=0&selectedKind=${encodeURIComponent(
        component.kind,
      )}&selectedStory=${encodeURIComponent(story.name)}`;
      const steps = story.steps;

      return {
        url: previewUrl,
        name: `${component.kind}: ${story.name}`,
        ...(steps && { steps }),
      };
    });

    return states.concat(componentStates);
  }, []);
}

async function getScreenerStates(screenerConfig: ScreenerRunnerConfig): Promise<ScreenerState[]> {
  await startStorybook(screenerConfig, {});

  return transformToStates(screenerGetStorybook() as ScreenerStorybookSection, screenerConfig.baseUrl);
}

/**
 * Outputs debug output for the affected packages graph
 * @param affectedPackages  - set of affected packages
 */
function debugAffectedGraph(affectedPackages: Set<string>) {
  console.log('affected package tree');
  console.log(Array.from(affectedPackages.values()));
}

type ScreenerStory = { steps?: ScreenerRunnerStep[] };
type StorybookSection = ReturnType<typeof getStorybook>[number];
type ScreenerStorybookStory = ScreenerStory & StorybookSection['stories'][number];
type ScreenerStorybookSection = Array<{ stories: ScreenerStorybookStory[] } & StorybookSection>;
