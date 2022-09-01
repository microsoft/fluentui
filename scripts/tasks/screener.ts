import { screenerRunner, environment } from '../screener/screener.runner';
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
  console.log('screener config for run:');
  console.log(JSON.stringify(screenerConfig, null, 2));

  try {
    console.log(`screener-runner: is artifact present ${JSON.stringify(environment.screener.isArtifactPresent)}`);
    if (environment.screener.isArtifactPresent === 'true') {
      //Skipping "getScreenerStates()" if artifacts were not build
      console.log('Running screener test:');
      const screenerStates = await getScreenerStates(screenerConfig);
      screenerConfig.states = screenerStates;
    }
    //call "screenerRunner()" since it controls CI checks on a PR and screener tests being run/skipped
    await screenerRunner(screenerConfig);
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

type ScreenerStory = { steps?: ScreenerRunnerStep[] };
type StorybookSection = ReturnType<typeof getStorybook>[number];
type ScreenerStorybookStory = ScreenerStory & StorybookSection['stories'][number];
type ScreenerStorybookSection = Array<{ stories: ScreenerStorybookStory[] } & StorybookSection>;
