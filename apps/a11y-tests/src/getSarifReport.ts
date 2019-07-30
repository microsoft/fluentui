import * as ReactDOMServer from 'react-dom/server';
import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';
import { convertAxeToSarif, SarifLog } from 'axe-sarif-converter';
import { Stylesheet, InjectionMode, resetIds } from 'office-ui-fabric-react';

const disabledAxeRules = ['document-title', 'html-has-lang', 'landmark-one-main', 'page-has-heading-one', 'region', 'bypass'];

/* tslint:disable-next-line:no-any */
function renderTestHtml(element: React.ReactElement<any>): string {
  resetIds();
  const stylesheet = Stylesheet.getInstance();
  stylesheet.reset();
  stylesheet.setConfig({ injectionMode: InjectionMode.none });

  const htmlPart = ReactDOMServer.renderToStaticMarkup(element);
  const cssPart = stylesheet.getRules();

  return `<html>
            <head><style type="text/css">${cssPart}</style></head>
            <body>${htmlPart}</body>
          </html>
  `;
}

/* tslint:disable-next-line:no-any */
export async function getSarifReport(browser: puppeteer.Browser, element: React.ReactElement<any>): Promise<SarifLog> {
  const page = await browser.newPage();
  const testHtml = renderTestHtml(element);
  await page.setContent(testHtml);

  const axeReport = await new AxePuppeteer(page).disableRules(disabledAxeRules).analyze();
  const sarifReport = convertAxeToSarif(axeReport);

  await page.close();

  return sarifReport;
}
