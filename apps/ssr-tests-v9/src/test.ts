import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import type { Browser } from 'puppeteer';

import { hrToSeconds } from './utils/helpers';
import { launchBrowser } from './utils/launchBrowser';
import { visitPage } from './utils/visitPage';

class RenderError extends Error {
  public name = 'RangeError';
}

async function test(): Promise<void> {
  const startTime = process.hrtime();
  console.log('Starting a browser...');

  const htmlPath = path.resolve(__dirname, '..', 'dist', 'index.html');

  if (!fs.existsSync(htmlPath)) {
    throw new Error('"dist/index.html" does not exist, please run "yarn build" first');
  }

  let browser: Browser | undefined;

  try {
    browser = await launchBrowser();
    console.log('Using', await browser.version());

    const url =
      process.platform === 'win32'
        ? `file:///${htmlPath.split(path.win32.sep).join(path.posix.sep)}`
        : `file://${htmlPath}`;
    console.log(`Using "${url}"`);

    await visitPage(browser, url);
    console.log(`Test finished successfully in ${hrToSeconds(process.hrtime(startTime))}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

test().catch((err: Error) => {
  console.error('');
  console.error(chalk.bgRed.whiteBright(' @fluentui/ssr-tests-v9 '));

  if (err instanceof RenderError) {
    console.error(
      [
        '  The test failed.',
        'Please use `$ npx serve dist` or `$ open dist/index.html` to open a HTML page that is used in tests.',
      ].join(' '),
    );
    console.error('  The reference error is below, you will see it in Devtools on the opened page.');
    console.error('');
  } else {
    console.error('  The test failed, the error below contains relevant information.');
    console.error('');
  }

  console.error(err);

  process.exit(1);
});
