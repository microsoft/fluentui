import puppeteer from 'puppeteer';
import { E2EApi } from './e2eApi';

jest.setTimeout(15000);

let page: puppeteer.Page;
let consoleErrors: string[] = [];

beforeEach(async () => {
  page = await browser.newPage();

  // setup console errors detection
  consoleErrors = [];
  page.on('console', message => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  global['e2e'] = new E2EApi(page);
});

afterEach(async () => {
  await page.close();
  expect(consoleErrors).toEqual([]);

  global['e2e'] = null;
});
