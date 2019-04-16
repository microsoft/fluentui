import { getSarifReport } from '../getSarifReport';
import { SarifLog } from 'axe-sarif-converter/dist/sarif/sarif-log';
import { Result } from 'axe-sarif-converter/dist/sarif/sarif-2.0.0';

// Extract interesting info to reduce snapshot size
function dehydrateSarifReport(report: SarifLog): Result[] {
  const results = report.runs[0]!.results!;
  return results.filter(item => item.level === 'error');
}

export async function testComponent(component: { name: string; url: string }) {
  it(`runs Axe on ${component.name}`, async () => {
    const report = await getSarifReport(component.url);

    const errors = dehydrateSarifReport(report);
    expect(errors).toMatchSnapshot();

    const errorCount = errors.length;
    const errorCountMessage = `Found ${errorCount} a11y errors for ${
      component.name
    }. Please check 'Scan' tab in 'office-ui-fabric-react' on Azure DevOps`;
    expect(errorCountMessage).toMatchSnapshot();
  }, 60000);
}
