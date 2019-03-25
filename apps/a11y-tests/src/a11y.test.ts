import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';

const OUFR_EXAMPLES_ROOT = 'https://fabricweb.z5.web.core.windows.net/oufr/6.87.0/';
const COMPONENTS = [
  {
    name: 'Button',
    url: '#/examples/button'
  },
  {
    name: 'TextField',
    url: '#/examples/textfield'
  }
];

async function getAxeReport(subUrl: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(`${OUFR_EXAMPLES_ROOT}${subUrl}`);

  const report = await new AxePuppeteer(page).include(['.ExampleCard-example']).analyze();

  await page.close();
  await browser.close();

  return report;
}

describe('Axe tests for components', () => {
  COMPONENTS.forEach(component => {
    it(`runs Axe on ${component.name}`, async () => {
      const report = await getAxeReport(component.url);
      expect(report.violations).toMatchSnapshot('violations');
    });
  });
});
