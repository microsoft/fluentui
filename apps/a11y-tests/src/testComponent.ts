import { getAxeReport } from './getAxeReport';
import { axeToSarif } from './sarif-converter';

export async function testComponent(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getAxeReport(component.url);
    expect(report.violations).toMatchSnapshot('violations');
  }, 20000);
}

export async function testComponentSarif(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getAxeReport(component.url);
    const sarifReport = axeToSarif(report);
    expect(sarifReport.runs[0].results).toMatchSnapshot('sarif results');
  }, 20000);
}
