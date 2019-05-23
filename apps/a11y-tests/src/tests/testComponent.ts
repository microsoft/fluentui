import { getSarifReport } from '../getSarifReport';
import { SarifLog } from 'axe-sarif-converter/dist/sarif/sarif-log';
import { Result } from 'axe-sarif-converter/dist/sarif/sarif-2.0.0';
import * as fs from 'fs';
import * as path from 'path';

// Keep only errors to reduce snapshot size
function dehydrateSarifReport(report: SarifLog): Result[] {
  return report.runs[0]!.results!.filter(item => item.level === 'error');
}

/* tslint:disable-next-line:no-any */
export async function testComponent(component: { name: string; pageName: string; elem: React.ReactElement<any> }) {
  it(`runs Axe on ${component.name} (${component.pageName})`, async () => {
    const sarifReport: SarifLog = await getSarifReport(component.elem);

    // Save the report into `dist/reports` folder
    fs.writeFileSync(path.resolve(__dirname, `../../dist/reports/${component.pageName}.sarif`), JSON.stringify(sarifReport), {
      encoding: 'utf8'
    });

    // Match the 'errors' section with snapshot
    expect(dehydrateSarifReport(sarifReport)).toMatchSnapshot();
  });
}
