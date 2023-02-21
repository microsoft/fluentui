import type { Browser } from 'puppeteer';
import { visitUrl } from '@fluentui/scripts-puppeteer';
import { PROVIDER_ID } from './constants';

class RenderError extends Error {
  public name = 'RangeError';
}

export async function visitPage(browser: Browser, url: string) {
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

  await visitUrl(page, url);

  // @ts-expect-error - https://github.com/puppeteer/puppeteer/issues/9582
  await page.waitForSelector(`#${PROVIDER_ID}`);
  await page.close();

  if (error) {
    throw error;
  }
}
