import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';
import { convertAxeToSarif } from 'axe-sarif-converter';
import { SarifLog } from 'axe-sarif-converter/dist/sarif/sarif-log'; // TODO - merge with prev line when SarifLog is exported from index

const TEST_URL_ROOT = 'http://localhost:4322/';

export async function getSarifReport(subUrl: string): Promise<SarifLog> {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setBypassCSP(true);

  try {
    await page.goto(`${TEST_URL_ROOT}${subUrl}`, { waitUntil: 'load', timeout: 60000 });
  } catch (e) {
    browser.close();
    throw e;
  }

  const axeReport = await new AxePuppeteer(page).include(['.ExampleCard-example']).analyze();
  const sarifReport = convertAxeToSarif(axeReport);

  await page.close();
  await browser.close();

  return sarifReport;
}
