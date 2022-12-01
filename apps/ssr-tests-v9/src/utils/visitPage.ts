import type { Browser, Page } from 'puppeteer';
import { PROVIDER_ID } from './constants';

class RenderError extends Error {
  public name = 'RangeError';
}

export async function visitUrl(page: Page, url: string) {
  let attempt = 1;

  while (attempt <= 5) {
    try {
      await page.goto(url, { timeout: 10 * 1000 /* 10 seconds */ });
      break;
    } catch (err) {
      if (attempt === 5) {
        console.error(`Failed to navigate to a page after 5 attempts...`);
        throw err;
      }

      console.warn('A browser failed to navigate to a page, retrying...');
      console.warn(err);

      attempt++;
    }
  }
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

  await page.waitForSelector(`#${PROVIDER_ID}`);
  await page.close();

  if (error) {
    throw error;
  }
}
