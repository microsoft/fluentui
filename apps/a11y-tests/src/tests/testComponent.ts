import { getSarifReport } from '../getSarifReport';
import { ISarifLog } from 'src/sarif-converter/sarif/isarflog';
import { Result } from 'src/sarif-converter/sarif/sarifv2';

// Extract interesting info to reduce snapshot size
function dehydrateSarifReport(report: ISarifLog): Result[] {
  const results = report.runs[0]!.results!;
  return results.filter(item => item.level === 'error');
}

export async function testComponent(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getSarifReport(component.url);
    expect(dehydrateSarifReport(report)).toMatchSnapshot();
  }, 60000);
}
