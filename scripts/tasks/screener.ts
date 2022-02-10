import { screenerRunner, cancelScreenerRun, ScreenerRunnerConfig, ScreenerState } from '../screener';
import { getAffectedPackages, getAllPackageInfo, findGitRoot } from '../monorepo';
import url from 'url';
import path from 'path';
// screener-storybook has no typings
// @ts-ignore
import { startStorybook, getStorybook } from 'screener-storybook';

/**
 * Starts or cancels a screener run through the screener proxy.
 * Runs are cancelled if package does not appear in Lage's affected package graph.
 */
export async function screener() {
  const packageInfos = getAllPackageInfo();
  const packagePath = path.relative(findGitRoot(), process.cwd());
  const affectedPackageInfo = Object.values(packageInfos).find(x => x.packagePath === packagePath);

  const screenerConfigPath = path.resolve(process.cwd(), './screener.config.js');
  const screenerConfig: ScreenerRunnerConfig = require(screenerConfigPath);
  const screenerStates = await getScreenerStates(
    screenerConfig,
    process.env.DEPLOYBASEPATH,
    '/react-screener/iframe.html',
  );
  screenerConfig.states = screenerStates;
  console.log('screener config for run');
  console.dir(screenerConfig, { depth: 10 });
  const affectedPackages = getAffectedPackages();
  try {
    if (!affectedPackages.has(affectedPackageInfo.packageJson.name)) {
      await cancelScreenerRun(screenerConfig);
    } else {
      await screenerRunner(screenerConfig);
    }
  } catch (err) {
    console.error('failed to run screener task');
    console.error(err);
    // screener-runner internally starts a puppeteer instance that only closes on process exist
    process.exit(1);
  }

  process.exit(0);
}

/**
 * Collect all stories and testing steps.
 * This is is run inside a puppeteer instance in screener-runner
 *
 * @param storybook - storybook object in the browser
 * @param baseUrl - base url of the deployed storybook
 * @returns screen steps
 */
function transformToStates(storybook, baseUrl, previewRoute) {
  // clean baseUrl. remove query/hash/trailing-slash
  const urlObj = url.parse(baseUrl);
  urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
  baseUrl = url.format(urlObj);
  // transform into states
  const states: ScreenerState[] = [];
  storybook.forEach(component => {
    component.stories.forEach(story => {
      const previewUrl = `${baseUrl}${previewRoute}?dataId=0&selectedKind=${encodeURIComponent(
        component.kind,
      )}&selectedStory=${encodeURIComponent(story.name)}`;
      const state = {
        url: previewUrl,
        name: component.kind + ': ' + story.name,
        ...(story.steps && { steps: story.steps }),
      };

      states.push(state);
    });
  });
  return states;
}

async function getScreenerStates(screenerConfig, baseUrl, previewPath) {
  await startStorybook(screenerConfig, {});

  return transformToStates(getStorybook(), baseUrl, previewPath);
}
