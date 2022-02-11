// import { getAffectedPackages, getAllPackageInfo, findGitRoot } from '../monorepo';
import {
  screenerRunner,
  // cancelScreenerRun
} from '../screener/screener.runner';
import { ScreenerRunnerConfig, ScreenerRunnerStep, ScreenerState } from '../screener/screener.types';
import path from 'path';
// @ts-ignore - screener-storybook has no typings
import { startStorybook, getStorybook as screenerGetStorybook } from 'screener-storybook';
import { getStorybook, Story } from '@storybook/react';
/**
 * Starts or cancels a screener run through the screener proxy.
 * Runs are cancelled if package does not appear in Lage's affected package graph.
 */
export async function screener() {
  const screenerConfigPath = path.resolve(process.cwd(), './screener.config.js');
  const screenerConfig: ScreenerRunnerConfig = require(screenerConfigPath);
  const screenerStates = await getScreenerStates(screenerConfig, `${process.env.DEPLOYURL}/react-screener/iframe.html`);
  screenerConfig.states = screenerStates;
  console.log('screener config for run');
  console.log(JSON.stringify(screenerConfig, null, 2));
  await screenerRunner(screenerConfig);
  // screener-storybook internally starts a puppeteer instance that only closes on process exist
  process.exit(0);

  // Scoping can only be used once the legacy check and new check switch required status
  // const packageInfos = getAllPackageInfo();
  // const packagePath = path.relative(findGitRoot(), process.cwd());
  // const affectedPackageInfo = Object.values(packageInfos).find(x => x.packagePath === packagePath);
  // const affectedPackages = getAffectedPackages();
  // try {
  // if (!affectedPackages.has(affectedPackageInfo.packageJson.name)) {
  // await cancelScreenerRun(screenerConfig);
  // } else {
  // await screenerRunner(screenerConfig);
  // }
  // } catch (err) {
  // console.error('failed to run screener task');
  // console.error(err);
  // // screener-storybook internally starts a puppeteer instance that only closes on process exist
  // process.exit(1);
  // }
  // process.exit(0);
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
function transformToStates(storybook: StorybookSection, baseUrl: string): ScreenerState[] {
  const states: ScreenerState[] = [];
  storybook.forEach(component => {
    component.stories.forEach(story => {
      const previewUrl = `${baseUrl}?dataId=0&selectedKind=${encodeURIComponent(
        component.kind,
      )}&selectedStory=${encodeURIComponent(story.name)}`;
      const steps = ((story as unknown) as StorybookStory | undefined).steps;

      const state = {
        url: previewUrl,
        name: `${component.kind}: ${story.name}`,
        ...(steps && { steps }),
      };

      states.push(state);
    });
  });
  return states;
}

async function getScreenerStates(screenerConfig, baseUrl): Promise<ScreenerState[]> {
  await startStorybook(screenerConfig, {});

  return transformToStates(screenerGetStorybook() as StorybookSection, baseUrl);
}

// screener-storybook has no types, and none of the types are exported by storybook
type StorybookSection = ReturnType<typeof getStorybook> & { steps: ScreenerRunnerStep[] };

type StorybookStory = StorybookSection[0]['stories'][0] & { steps: ScreenerRunnerStep[] };
