import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';
import { SarifLog } from './axe-sarif-converter/sarif/sarifLog';
import { axeToSarif } from './axe-sarif-converter';

const TEST_URL_ROOT = 'http://localhost:4322/';

export async function getSarifReport(subUrl: string): Promise<SarifLog> {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(`${TEST_URL_ROOT}${subUrl}`);

  const axeReport = await new AxePuppeteer(page).include(['.ExampleCard-example']).analyze();
  const sarifReport = axeToSarif(axeReport);

  await page.close();
  await browser.close();

  return sarifReport;
}
