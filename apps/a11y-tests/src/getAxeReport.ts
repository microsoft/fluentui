import * as Axe from 'axe-core';
import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';

const TEST_URL_ROOT = 'http://localhost:4322/';

export async function getAxeReport(subUrl: string): Promise<Axe.AxeResults> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(`${TEST_URL_ROOT}${subUrl}`);

  const report = await new AxePuppeteer(page).include(['.ExampleCard-example']).analyze();

  await page.close();
  await browser.close();

  return report;
}
