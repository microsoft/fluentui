import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { getSarifReport } from '../getSarifReport';
import { SarifLog } from 'axe-sarif-converter/dist/sarif/sarif-log';
import { Result } from 'axe-sarif-converter/dist/sarif/sarif-2.0.0';

// Keep only errors to reduce snapshot size
function dehydrateSarifReport(report: SarifLog): Result[] {
  return report.runs[0]!.results!.filter(item => item.level === 'error');
}

/* tslint:disable-next-line:no-any */
async function testComponent(component: { name: string; pageName: string; elem: React.ReactElement<any> }) {
  it(`checks accessibility of ${component.name} (${component.pageName})`, async () => {
    const sarifReport: SarifLog = await getSarifReport(component.elem);

    // Save the report into `dist/reports` folder
    fs.writeFileSync(path.resolve(__dirname, `../../dist/reports/${component.pageName}.sarif`), JSON.stringify(sarifReport), {
      encoding: 'utf8'
    });

    // Match the 'errors' section with snapshot
    expect(dehydrateSarifReport(sarifReport)).toMatchSnapshot();
  });
}

function getControlAndPageName(exampleFilePath: string): [string, string] {
  const match = exampleFilePath.match(/components\/(.+)\/examples\/(.+)\.js/)!;
  return [match[1], match[2]];
}

// List of controls we expose to a11y tests
const enabledControls: string[] = ['Button', 'TextField'];
const files: string[] = [];

enabledControls.forEach((control: string) => {
  const exampleFiles: string[] = glob.sync(
    path.resolve(process.cwd(), `node_modules/office-ui-fabric-react/lib-commonjs/components/${control}/examples/*Example*.js`)
  );
  files.push(...exampleFiles);
});

files.forEach((componentFile: string) => {
  const componentModule = require(componentFile);
  const [controlName, pageName] = getControlAndPageName(componentFile);
  Object.keys(componentModule)
    .filter(key => typeof componentModule[key] === 'function')
    .forEach(key => {
      const ComponentUnderTest: React.ComponentClass = componentModule[key];
      testComponent({
        name: controlName,
        pageName: pageName,
        elem: <ComponentUnderTest />
      });
    });
});
