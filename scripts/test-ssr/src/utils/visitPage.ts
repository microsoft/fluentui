import { visitUrl } from '@fluentui/scripts-puppeteer';
import * as match from 'micromatch';
import type { Browser } from 'puppeteer';
import * as React from 'react';

import { PROVIDER_ID } from './constants';
import { containsAriaDescriptionWarning } from './helpers';

export class RenderError extends Error {
  public name = 'RangeError';
}

export async function visitPage(browser: Browser, url: string) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  let error: Error | undefined;

  page.on('console', message => {
    if (message.type() === 'error') {
      const messageContent = message.text();

      // Ignoring 'aria-description' warning from React 17 as it's a valid prop
      // https://github.com/facebook/react/issues/21035
      if (containsAriaDescriptionWarning(messageContent) && React.version.startsWith('17')) {
        return;
      }

      error = new RenderError(messageContent);
    }
  });

  page.on('request', request => {
    if (match.isMatch(request.url(), ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'])) {
      return request.respond({
        status: 200,
        body: '',
      });
    }

    return request.continue();
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
