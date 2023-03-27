import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';

import type { ChromiumLaunchOptions } from './types';

export async function launchChromium(options: ChromiumLaunchOptions = {}) {
  const maxAttempts = 5;

  let attempt = 1;
  let browser: Browser | undefined;

  console.log(`playwright-chromium: launching with settings: ${JSON.stringify(options)}`);

  while (!browser) {
    try {
      browser = await chromium.launch(options);
      console.log('playwright-chromium: launched...');
      console.log(`playwright-chromium: Chromium ${browser.version()}`);
    } catch (err) {
      if (attempt === maxAttempts) {
        console.error(`playwright-chromium: launch failed 5 attempts`);
        throw err;
      }
      console.warn(`playwright-chromium: launch failed (will retry ${maxAttempts - attempt} more times)`);
      console.warn(err);

      attempt++;
    }
  }

  return browser;
}

export async function visitUrl(page: Page, url: string) {
  const TEN_SECONDS = 10 * 1000;
  const maxAttempts = 5;
  let attempt = 1;

  console.log(`playwright-chromium: loading url "${url}"...`);

  while (attempt <= 5) {
    try {
      await page.goto(url, { timeout: TEN_SECONDS });
      console.log(`playwright-chromium: url loaded...`);
      break;
    } catch (err) {
      if (attempt === maxAttempts) {
        console.error(`playwright-chromium: failed to navigate to a page after 5 attempts...`);
        throw err;
      }

      console.warn(
        `playwright-chromium: failed to navigate to a page (will retry ${maxAttempts - attempt} more times)...`,
      );
      console.warn(err);

      attempt++;
    }
  }
}
