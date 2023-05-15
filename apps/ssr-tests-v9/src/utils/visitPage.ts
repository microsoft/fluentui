import type { Browser } from 'puppeteer';
import { visitUrl } from '@fluentui/scripts-puppeteer';
import { PROVIDER_ID } from './constants';
import * as React from 'react';
import { containsAriaDescriptionWarning } from './helpers';

class RenderError extends Error {
  public name = 'RangeError';
}

export async function visitPage(browser: Browser, url: string) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  let error: Error | undefined;

  page.on('console', message => {
    if (message.type() === 'error') {
      const messageContent = message.text();

      // Ignoring 'aria-description' warning from react 17 as it's a valid prop
      // https://github.com/facebook/react/issues/21035
      if (containsAriaDescriptionWarning(messageContent) && React.version.startsWith('17')) {
        return;
      }

      // Ignoring network errors as we have an interceptor that prevents loading everything except our JS bundle
      if (!messageContent.includes('net::ERR_FAILED')) {
        error = new RenderError(messageContent);
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
