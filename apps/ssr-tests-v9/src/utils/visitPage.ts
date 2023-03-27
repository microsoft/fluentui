import { visitUrl } from '@fluentui/scripts-playwright';
import type { Browser } from '@fluentui/scripts-playwright';

import { PROVIDER_ID } from './constants';

class RenderError extends Error {
  public name = 'RangeError';
}

export async function visitPage(browser: Browser, url: string) {
  const context = await browser.newContext();

  // Our interceptor blocks loading images from CDN
  await context.route('**/*.{png,jpg,svg}', route => route.abort());

  const page = await context.newPage();
  let error: Error | undefined;

  page.on('console', message => {
    if (message.type() === 'error') {
      // Ignoring network errors as we have an interceptor that prevents loading everything except our JS bundle
      if (!message.text().includes('net::ERR_FAILED')) {
        error = new RenderError(message.text());
      }
    }
  });

  page.on('pageerror', err => {
    error = err;
  });

  await visitUrl(page, url);

  await page.waitForSelector(`#${PROVIDER_ID}`);
  await page.close();

  if (error) {
    throw error;
  }
}
