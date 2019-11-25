import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as puppeteer from 'puppeteer';
import * as os from 'os';
import { getSarifReport } from '../getSarifReport';
import { SarifLog } from 'axe-sarif-converter';
import { Result } from 'sarif';

const ReactDOM = require('react-dom');

// Keep only errors to reduce snapshot size
function dehydrateSarifReport(report: SarifLog): Result[] {
  return report.runs[0]!.results!.filter(item => item.level === 'error');
}

async function testComponent(
  browserPromise: Promise<puppeteer.Browser>,
  /* tslint:disable-next-line:no-any */
  component: { name: string; pageName: string; elem: React.ReactElement<any> }
) {
  it(`checks accessibility of ${component.name} (${component.pageName})`, async () => {
    const browser = await browserPromise;
    const sarifReport: SarifLog = await getSarifReport(browser, component.elem);
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

describe('a11y test', () => {
  const browserPromise = puppeteer.launch({
    userDataDir: path.resolve(os.tmpdir(), 'oufr-a11y-test-profile')
  });

  beforeAll(() => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    jest.spyOn(Math, 'random').mockImplementation(() => {
      return 0;
    });
  });

  afterAll(async () => {
    (await browserPromise).close();
  });

  const files: string[] = [];
  const oufrPath = path.dirname(require.resolve('office-ui-fabric-react/package.json'));
  const exampleFiles: string[] = glob.sync(path.join(oufrPath, `lib-commonjs/components/**/examples/*Example*.js`));
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
          testComponent(browserPromise, {
            name: controlName,
            pageName: pageName,
            elem: <ComponentUnderTest />
          });
        });
    });
});
