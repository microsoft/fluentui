import { getAxeReport } from './getAxeReport';

export async function testComponent(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getAxeReport(component.url);
    expect(report.violations).toMatchSnapshot('violations');
  }, 20000);
}
