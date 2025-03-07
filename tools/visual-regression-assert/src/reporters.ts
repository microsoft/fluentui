import { render } from 'ejs';
const Table = require('cli-table3') as import('cli-table3');
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { stripIndents } from './utils';
import type { Metadata, Result, Report } from './types';

export function generateMarkdownReport(
  results: Result[],
  paths: {
    absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
  },
) {
  const template = readFileSync(join(__dirname, 'template/report.md__tmpl__'), 'utf-8');
  const generatedContent = results
    .map(result => {
      let generatedContent = stripIndents`
            | ${result.file} | ${result.passed ? '✅ Passed' : '❌ Failed'} |
            `;

      if (!result.passed) {
        if (result.error) {
          generatedContent += `Error: ${result.error}`;
          generatedContent += `<br/>`;
        }
        if (result.diffPixels) {
          generatedContent += `Diff pixels: ${result.diffPixels}`;
          // TODO: this is impossible to do in GitHub MD context without either uploading images to some cloud or inlining  them via BASE64 which would be catastrophic for GH GUI
          // generatedContent += `<br/>`;
          // generatedContent += `<figure><figcaption>Baseline</<figcaption><img src="${paths.baselineDir}/${result.file}" alt="Baseline"></figure>`;
          // generatedContent += `<figure><figcaption>Actual</<figcaption><img src="${paths.actualDir}/${result.file}" alt="Actual"></figure>`;
          // generatedContent += `<figure><figcaption>Diff</<figcaption><img src="${paths.diffDir}/${result.file}" alt="Diff"></figure>`;
        }
      }

      generatedContent += `|`;

      return generatedContent;
    })
    .join('\n');

  const renderedMD = render(template, { content: generatedContent });

  const reportPath = paths.absolute.reportPath.replace('html', 'md');
  writeFileSync(reportPath, renderedMD, 'utf-8');

  console.log(`Markdown report generated: ${reportPath}`);
}

export function generateHtmlReport(
  results: Result[],
  paths: {
    absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
  },
) {
  const template = readFileSync(join(__dirname, 'template/report.html__tmpl__'), 'utf-8');
  const generatedContent = results
    .map(result => {
      let generatedContent = stripIndents`
          <tr>
            <td>${result.file}</td>
            <td class="${result.passed ? 'passed' : 'failed'}">${result.passed ? 'Passed' : 'Failed'}</td>
            <td>`;

      if (!result.passed) {
        if (result.error) {
          generatedContent += `<p>Error: ${result.error}</p>`;
        }
        if (result.diffPixels) {
          const sanitizedFileName = encodeURIComponent(result.file);
          const images = {
            baseline: createRelativeImagePath(paths.relative.reportPath, paths.relative.baselineDir),
            actual: createRelativeImagePath(paths.relative.reportPath, paths.relative.actualDir),
            diff: createRelativeImagePath(paths.relative.reportPath, paths.relative.diffDir),
          };
          generatedContent += `<p>Diff pixels: ${result.diffPixels}</p>`;
          generatedContent += `<div class="image-container">`;
          generatedContent += `<figure><figcaption>Baseline</figcaption><img src="${join(
            images.baseline,
            sanitizedFileName,
          )}" alt="Baseline"></figure>`;
          generatedContent += `<figure><figcaption>Actual</figcaption><img src="${join(
            images.actual,
            sanitizedFileName,
          )}" alt="Actual"></figure>`;
          generatedContent += `<figure><figcaption>Diff</figcaption><img src="${join(
            images.diff,
            sanitizedFileName,
          )}" alt="Diff"></figure>`;
          generatedContent += `</div>`;
        }
      }

      generatedContent += `</td></tr>`;

      return generatedContent;
    })
    .join('\n');

  const renderedHTML = render(template, { content: generatedContent });

  writeFileSync(paths.absolute.reportPath, renderedHTML);
  console.log(`HTML report generated: ${paths.absolute.reportPath}`);
}

export function generateJsonReport(
  results: Result[],
  options: {
    metadata: Metadata;
    reportFileName: string;
    paths: {
      absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
      relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    };
  },
) {
  const { metadata, paths, reportFileName } = options;
  const reportPathRoot = dirname(paths.absolute.reportPath);

  const reportPathFile = join(reportPathRoot, reportFileName);
  const report: Report = { results, metadata };

  writeFileSync(reportPathFile, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`JSON report generated: ${reportPathFile}`);
}

export function generateCliReport(
  results: Result[],
  options: {
    metadata: Metadata;
    reportFileName: string;
    paths: {
      absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
      relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    };
  },
) {
  const table = new Table({
    colAligns: ['left', 'left', 'right'],
    head: ['File', 'Status', 'Details'],
  });

  results.forEach(result => {
    let details = '';

    if (!result.passed) {
      if (result.error) {
        details += `Error: ${result.error}`;
      }
      if (result.diffPixels) {
        details += `Diff pixels: ${result.diffPixels}`;
      }
    }

    table.push([
      result.file,
      result.passed ? '✅ Passed' : '❌ Failed',
      details.trim(), // Remove trailing newline
    ]);
  });

  // const footer = `🤖 This report was generated against '${repository}/commit/${commitSHA}'`;
  const footer = `🤖 Report was generated`;

  console.log(table.toString());
  console.log('');
  console.log(footer);
}

function createRelativeImagePath(reportFilePath: string, imageDirectory: string) {
  try {
    const reportDir = dirname(reportFilePath);
    const relativePath = relative(reportDir, imageDirectory);
    return join(relativePath, '/'); // Add a trailing slash for directory access
  } catch (error) {
    console.error('Error creating relative path:', error);
    return ''; // Return an empty string in case of an error
  }
}
