import * as fs from 'fs';
import * as path from 'path';

import { launch } from '@fluentui/scripts-puppeteer';
import chalk from 'chalk';
import * as glob from 'glob';
import * as match from 'micromatch';
import type { Browser } from 'puppeteer';

import { buildAssets } from '../utils/buildAssets';
import { CHROME_VERSION } from '../utils/constants';
import { generateEntryPoints } from '../utils/generateEntryPoints';
import { hrToSeconds } from '../utils/helpers';
import { renderToHTML } from '../utils/renderToHTML';
import { visitPage } from '../utils/visitPage';

const EXCLUDED_STORIES = [
  // Portals currently do not support hydration
  // https://github.com/facebook/react/issues/13097
  '**/react-portal/**',
  // https://github.com/microsoft/fluentui/issues/27338
  '**/react-table/stories/DataGrid/Virtualization.stories.tsx',
  '**/react-table/stories/Table/Virtualization.stories.tsx',
];

type MainParams = {
  stories: string;
};

export async function main(params: MainParams) {
  const distDirectory = path.resolve(process.cwd(), 'node_modules', '.cache', 'ssr-tests');

  if (!fs.existsSync(distDirectory)) {
    await fs.promises.mkdir(distDirectory, { recursive: true });
  }

  const esmEntryPoint = path.resolve(distDirectory, 'App.tsx');
  const cjsEntryPoint = path.resolve(distDirectory, 'stories.tsx');

  const cjsOutfile = path.resolve(distDirectory, 'out-cjs.js');
  const esmOutfile = path.resolve(distDirectory, 'out-esm.js');
  const htmlOutfile = path.resolve(distDirectory, 'index.html');

  // ---

  const generateStartTime = process.hrtime();

  const { allowedStories, excludedStories } = glob.sync(params.stories).reduce<{
    allowedStories: string[];
    excludedStories: string[];
  }>(
    (acc, storyPath) => {
      if (storyPath.includes('index.stories.ts')) {
        return acc;
      }

      const absoluteStoriesPath = path.resolve(process.cwd(), storyPath);
      const isExcludedPath = match.isMatch(absoluteStoriesPath, EXCLUDED_STORIES);

      if (isExcludedPath) {
        acc.excludedStories.push(absoluteStoriesPath);
        return acc;
      }

      acc.allowedStories.push(absoluteStoriesPath);
      return acc;
    },
    { allowedStories: [], excludedStories: [] },
  );

  if (allowedStories.length > 0) {
    console.log(chalk.bgBlueBright('📦 Following stories were bundled:'));
    console.log(allowedStories.map(filepath => `  - ${path.relative(process.cwd(), filepath)}`).join('\n'));
  }

  if (excludedStories.length > 0) {
    console.log(chalk.bgYellowBright('❌  Following stories were excluded by config:'));
    console.log(excludedStories.map(filepath => `  - ${path.relative(process.cwd(), filepath)}`).join('\n'));
  }

  if (allowedStories.length === 0) {
    console.log(chalk.bgYellowBright('🏁 No stories to bundle, exiting...'));
    return;
  }

  await generateEntryPoints({
    esmEntryPoint,
    cjsEntryPoint,
    storiesPaths: allowedStories,
  });

  console.log(
    chalk.bgGreenBright(
      `📦 Entry points were generated in ${chalk.bold(hrToSeconds(process.hrtime(generateStartTime)))}`,
    ),
  );

  // ---

  const buildStartTime = process.hrtime();

  await buildAssets({
    chromeVersion: CHROME_VERSION,

    esmEntryPoint,
    cjsEntryPoint,

    cjsOutfile,
    esmOutfile,
  });

  console.log(
    chalk.bgGreenBright(`📦 Assets were built in ${chalk.bold(hrToSeconds(process.hrtime(buildStartTime)))}`),
  );

  // ---

  const renderStartTime = process.hrtime();

  await renderToHTML({
    cjsOutfile,
    esmOutfile,
    htmlOutfile,
  });

  console.log(chalk.bgGreenBright(`🔥 Render done in ${chalk.bold(hrToSeconds(process.hrtime(renderStartTime)))}`));

  // ---

  const startTime = process.hrtime();

  let browser: Browser | undefined;

  try {
    browser = await launch({
      ignoreDefaultArgs: [
        // If sidebars are hidden, they will have "0px" width. It's not the same as in a real browser
        // https://github.com/microsoft/fluentui/issues/27357
        '--hide-scrollbars',
      ],
    });
    console.log(chalk.bgWhiteBright.black('🛠️ Using', await browser.version()));

    const url =
      process.platform === 'win32'
        ? `file:///${htmlOutfile.split(path.win32.sep).join(path.posix.sep)}`
        : `file://${htmlOutfile}`;
    console.log(chalk.bgWhiteBright.black(`🛠️ Using asset in: `), url);

    await visitPage(browser, url);
    console.log(
      chalk.bgGreenBright(`🏁 Test finished successfully in ${chalk.bold(hrToSeconds(process.hrtime(startTime)))}`),
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
