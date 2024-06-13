import * as fs from 'fs';
import * as path from 'path';

import { launch } from '@fluentui/scripts-puppeteer';
import chalk from 'chalk';
import * as glob from 'glob';
import * as match from 'micromatch';
import type { Browser } from 'puppeteer';
import * as React from 'react';

import { buildAssets } from '../utils/buildAssets';
import { CHROME_VERSION } from '../utils/constants';
import { generateEntryPoints } from '../utils/generateEntryPoints';
import { containsAriaDescriptionWarning, hrToSeconds } from '../utils/helpers';
import { renderToHTML } from '../utils/renderToHTML';
import { visitPage } from '../utils/visitPage';

const EXCLUDED_STORIES = [
  // Portals currently do not support hydration
  // https://github.com/facebook/react/issues/13097
  '**/react-portal/**',
  // https://github.com/microsoft/fluentui/issues/27338
  '**/react-table/stories/src/DataGrid/Virtualization.stories.tsx',
  '**/react-table/stories/src/Table/Virtualization.stories.tsx',
];

type MainParams = {
  stories: string;
};

/**
 * Intercept console.error() and console.warn() calls during rendering HTML (i.e. SSR) to ensure that no errors and
 * warnings are thrown during rendering.
 */
function interceptConsoleLogs() {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args: unknown[]) => {
    // Ignoring 'aria-description' warning from React 17 as it's a valid prop
    // https://github.com/facebook/react/issues/21035
    if (containsAriaDescriptionWarning(args[0] + ' ' + args[1]) && React.version.startsWith('17')) {
      return;
    }

    console.log(chalk.bgRed.whiteBright('❌  A console.error() was thrown during rendering HTML:'));
    originalConsoleError(...args);

    throw new Error('During rendering a console.error() was thrown');
  };

  console.warn = (...args: unknown[]) => {
    console.log(chalk.bgRed.whiteBright('❌  A console.warn() was thrown:'));
    originalConsoleWarn(...args);

    throw new Error('During rendering a console.warn() was thrown during rendering HTML:');
  };

  return () => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  };
}

export async function main(params: MainParams) {
  /**
   * dist directory cannot be under node_modules in order to make TS path aliases work.
   * @see https://github.com/evanw/esbuild/blob/main/CHANGELOG.md#0180
   */
  const distDirectory = path.resolve(process.cwd(), 'dist', 'ssr-tests');

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

    distDirectory,

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
  const restoreConsole = interceptConsoleLogs();

  try {
    await renderToHTML({
      cjsOutfile,
      esmOutfile,
      htmlOutfile,
    });
  } finally {
    restoreConsole();
  }

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
