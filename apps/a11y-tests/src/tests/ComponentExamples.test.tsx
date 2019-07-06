import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { getSarifReport } from '../getSarifReport';
import { SarifLog } from 'axe-sarif-converter/dist/sarif/sarif-log';
import { Result } from 'axe-sarif-converter/dist/sarif/sarif-2.0.0';

const ReactDOM = require('react-dom');

// Keep only errors to reduce snapshot size
function dehydrateSarifReport(report: SarifLog): Result[] {
  return report.runs[0]!.results!.filter(item => item.level === 'error');
}

/* tslint:disable-next-line:no-any */
async function testComponent(component: { name: string; pageName: string; elem: React.ReactElement<any> }) {
  it(`checks accessibility of ${component.name} (${component.pageName})`, async () => {
    const sarifReport: SarifLog = await getSarifReport(component.elem);
    const errors = dehydrateSarifReport(sarifReport);

    // Save the report into `dist/reports` folder (only when there're errors)
    if (errors.length > 0) {
      fs.writeFileSync(path.resolve(__dirname, `../../dist/reports/${component.pageName}.sarif`), JSON.stringify(sarifReport), {
        encoding: 'utf8'
      });
    }

    // Match the 'errors' section with snapshot
    expect(errors).toMatchSnapshot();
  }, 20000);
}

function getControlAndPageName(exampleFilePath: string): [string, string] {
  const match = exampleFilePath.match(/components\/(.+)\/examples\/(.+)\.js/)!;
  return [match[1], match[2]];
}

const excludedExampleFiles: string[] = ['Keytips.Basic.Example', 'List.Basic.Example', 'Picker.CustomResult.Example'];

/* tslint:disable-next-line:no-any */
declare const global: any;

describe('a11y test', () => {
  const constantDate = new Date(Date.UTC(2017, 0, 6, 4, 41, 20));

  beforeAll(() => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    // Ensure test output is consistent across machine locale and time zone config.
    const mockToLocaleString = () => {
      return constantDate.toUTCString();
    };

    global.Date.prototype.toLocaleString = mockToLocaleString;
    global.Date.prototype.toLocaleTimeString = mockToLocaleString;
    global.Date.prototype.toLocaleDateString = mockToLocaleString;

    // Prevent random and time elements from failing repeated tests.
    global.Date = class {
      public static now() {
        return constantDate;
      }

      constructor() {
        return constantDate;
      }
    };

    jest.spyOn(Math, 'random').mockImplementation(() => {
      return 0;
    });
  });

  const files: string[] = [];
  const exampleFiles: string[] = glob.sync(
    path.resolve(process.cwd(), `node_modules/office-ui-fabric-react/lib-commonjs/components/**/examples/*Example*.js`)
  );
  files.push(...exampleFiles);

  files
    .filter((componentFile: string) => {
      return !excludedExampleFiles.some(excludedFile => componentFile.indexOf('/' + excludedFile) !== -1);
    })
    .forEach((componentFile: string) => {
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
});
