import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import type { Browser } from 'puppeteer';

import { PROVIDER_ID } from './utils/constants';
import { hrToSeconds } from './utils/helpers';
import { launchBrowser } from './utils/launchBrowser';

class RenderError extends Error {
  public name = 'RangeError';
}

export async function runTest(browser: Browser, url: string): Promise<void> {
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  let error: Error | undefined;

  page.on('console', message => {
    if (message.type() === 'error') {
      // Ignoring network errors as we have an interceptor that prevents loading everything except our JS bundle
      if (!message.text().includes('net::ERR_FAILED')) {
        error = new RenderError(message.text());
      }
    }
  });

  page.on('request', request => {
    // Our interceptor allows only our HTML and JS output
    if (request.url() === url || request.url().endsWith('/out-esm.js')) {
      return request.continue();
    }

    return request.abort();
  });

  page.on('pageerror', err => {
    error = err;
  });

  await page.goto(url);
  await page.waitForSelector(`#${PROVIDER_ID}`);

  await page.close();

  if (error) {
    throw error;
  }
}

async function test(): Promise<void> {
  const startTime = process.hrtime();
  console.log('Starting a browser...');

  let browser: Browser | undefined;

  try {
    browser = await launchBrowser();
    console.log('Using', await browser.version());

    const htmlPath = path.resolve(__dirname, '..', 'dist', 'index.html');

    if (!fs.existsSync(htmlPath)) {
      throw new Error('"dist/index.html" does not exist, please run "yarn build" first');
    }

    const url = `file://${htmlPath}`;
    console.log(`Using "${url}"`);

    await runTest(browser, url);
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
