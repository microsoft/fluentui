import fs from 'node:fs';
import prettier from 'prettier';
import strip from 'strip-ansi';
import {
  generateCliReport,
  generateMarkdownReport,
  generateHtmlReport,
  generateJsonReport,
  type Options,
} from './reporters';
import type { Result } from './types';

jest.mock('node:fs');

expect.addSnapshotSerializer({
  test(val) {
    return typeof val === 'string';
  },
  print(val) {
    return strip(val as string);
  },
});

const options = {
  metadata: {
    paths: {
      baselineDir: '/absoltue/baselineDir/',
      actualDir: '/absolute/actualDir/',
      diffDir: '/absoltue/diffDir/',
      outputBaselineDir: '/absolute/outputBaselineDir/',
      outputPath: '/absolute/outputPath/',
    },
    project: {
      root: '.',
      name: '@proj',
    },
  },
  reportFileName: 'reportFile',
  paths: {
    absolute: {
      baselineDir: '/absolute/baselineDir/',
      actualDir: '/absolute/actualDir/',
      diffDir: '/absolute/diffDir/',
      outputBaselineDir: '/absolute/outputBaselineDir/',
      outputPath: '/absolute/outputPath/',
    },
    relative: {
      baselineDir: 'relative/baselineDir/',
      actualDir: 'relative/actualDir/',
      diffDir: 'relative/diffDir/',
      outputBaselineDir: 'relative/outputBaselineDir/',
      outputPath: 'relative/outputPath/',
    },
  },
} satisfies Options;

const mockErrorReport: Result[] = [
  { file: 'file1.png', passed: true, diffPixels: 0 },
  { file: 'file2.png', passed: false, diffPixels: 100, error: 'Mismatch detected' },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('cli reporter', () => {
  it('should generate failed cli report', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});

    generateCliReport(mockErrorReport);

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`
      ┌───────────┬───────────┬───────────────────────────────────┐
      │ File      │ Status    │                           Details │
      ├───────────┼───────────┼───────────────────────────────────┤
      │ file1.png │ ✅ Passed │                                   │
      ├───────────┼───────────┼───────────────────────────────────┤
      │ file2.png │ ❌ Failed │ Mismatch detectedDiff pixels: 100 │
      └───────────┴───────────┴───────────────────────────────────┘
    `);
  });
});

describe('markdown reporter', () => {
  it('should generate markdown report', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync');
    const mockTemplate = `
### Snapshot Comparison Report

| File | Status | Details |
| ---- | ------ | ------- |
<%- content %>
`;

    readFileSyncMock.mockReturnValue(mockTemplate);

    generateMarkdownReport(mockErrorReport, options);

    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`Markdown report generated: /absolute/outputPath/report.md`);

    expect(prettier.format(writeFileSyncMock.mock.calls[0][1] as string, { parser: 'markdown' }))
      .toMatchInlineSnapshot(`
      ### Snapshot Comparison Report

      | File      | Status    | Details                                |
      | --------- | --------- | -------------------------------------- |
      | file1.png | ✅ Passed |                                        |
      | file2.png | ❌ Failed | Mismatch detected<br/>Diff pixels: 100 |

    `);
  });
});

describe('html reporter', () => {
  it('should genereate html report', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync');

    const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Visual Regression Report</title>
    </head>
  <body>
    <h1>Snapshot Comparison Report</h1>
    <table>
      <thead>
        <tr>
          <th>File</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <%- content %>
      </tbody>
    </table>
  </body>
</html>
`;

    readFileSyncMock.mockReturnValue(template);

    generateHtmlReport(mockErrorReport, options);

    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`HTML report generated: /absolute/outputPath/report.html`);

    expect(prettier.format(writeFileSyncMock.mock.calls[0][1] as string, { parser: 'html' })).toMatchInlineSnapshot(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Visual Regression Report</title>
        </head>
        <body>
          <h1>Snapshot Comparison Report</h1>
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>file1.png</td>
                <td class="passed">Passed</td>
                <td></td>
              </tr>
              <tr>
                <td>file2.png</td>
                <td class="failed">Failed</td>
                <td>
                  <p>Mismatch detected</p>
                  <div class="image-container"></div>
                  <p>Diff pixels: 100</p>
                  <div class="image-container">
                    <figure>
                      <figcaption>BASELINE</figcaption>
                      <img src="../outputBaselineDir/file2.png" alt="baseline" />
                    </figure>
                    <figure>
                      <figcaption>ACTUAL</figcaption>
                      <img src="../actualDir/file2.png" alt="actual" />
                    </figure>
                    <figure>
                      <figcaption>DIFF</figcaption>
                      <img src="../diffDir/file2.png" alt="diff" />
                    </figure>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>

    `);
  });
});

describe('json reporter', () => {
  it('should generate json report', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});

    generateJsonReport(mockErrorReport, options);

    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`JSON report generated: /absolute/outputPath/reportFile`);

    expect(writeFileSyncMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "results": [
          {
            "file": "file1.png",
            "passed": true,
            "diffPixels": 0
          },
          {
            "file": "file2.png",
            "passed": false,
            "diffPixels": 100,
            "error": "Mismatch detected"
          }
        ],
        "metadata": {
          "paths": {
            "baselineDir": "/absoltue/baselineDir/",
            "actualDir": "/absolute/actualDir/",
            "diffDir": "/absoltue/diffDir/",
            "outputBaselineDir": "/absolute/outputBaselineDir/",
            "outputPath": "/absolute/outputPath/"
          },
          "project": {
            "root": ".",
            "name": "@proj"
          }
        }
      }
    `);
  });
});
