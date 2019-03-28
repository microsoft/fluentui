import { getSarifReport } from '../getSarifReport';

export async function testComponent(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getSarifReport(component.url);
    expect(report.runs[0].results).toMatchSnapshot();
  }, 60000);
}
