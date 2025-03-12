import { render } from 'ejs';
const Table = require('cli-table3') as import('cli-table3');
import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { stripIndents } from './utils';
import type { Metadata, Result, Report } from './types';
import { reporterFileNames } from './shared';

type Options = {
  metadata: Metadata;
  reportFileName: string;
  paths: {
    absolute: {
      baselineDir: string;
      actualDir: string;
      diffDir: string;
      outputBaselineDir: string;
      outputPath: string;
    };
    relative: {
      baselineDir: string;
      actualDir: string;
      diffDir: string;
      outputBaselineDir: string;
      outputPath: string;
    };
  };
};

export function generateMarkdownReport(results: Result[], options: Options) {
  const template = readFileSync(join(__dirname, 'template/report.md__tmpl__'), 'utf-8');

  const { changedEntries, unchangedEntries } = getChangedEntriesInReport(results);
  const changedOutput = changedEntries
    .map(result => {
      let generatedContent = stripIndents`| ${result.file} | ❌ Failed |`;

      if (result.error) {
        generatedContent += result.error;
      }
      if (result.diffPixels) {
        generatedContent += `<br/>Diff pixels: ${result.diffPixels}`;
        // TODO: this is impossible to do in GitHub MD context without either uploading images to some cloud or inlining  them via BASE64 which would be catastrophic for GH GUI
        // generatedContent += `<br/>`;
        // generatedContent += `<figure><figcaption>Baseline</<figcaption><img src="${paths.baselineDir}/${result.file}" alt="Baseline"></figure>`;
        // generatedContent += `<figure><figcaption>Actual</<figcaption><img src="${paths.actualDir}/${result.file}" alt="Actual"></figure>`;
        // generatedContent += `<figure><figcaption>Diff</<figcaption><img src="${paths.diffDir}/${result.file}" alt="Diff"></figure>`;
      }

      generatedContent += `|`;

      return generatedContent;
    })
    .join('\n');

  const unchangedOutput = unchangedEntries
    .map(result => {
      const generatedContent = stripIndents`| ${result.file} | ✅ Passed |`;

      return generatedContent;
    })
    .join('\n');

  const renderedMD = render(template, { changed: changedOutput, unchanged: unchangedOutput });
  const reportPath = join(options.paths.absolute.outputPath, reporterFileNames.markdown);
  writeFileSync(reportPath, renderedMD, 'utf-8');

  console.log(`Markdown report generated: ${reportPath}`);
}

export function generateHtmlReport(results: Result[], options: Options) {
  const template = readFileSync(join(__dirname, 'template/report.html__tmpl__'), 'utf-8');

  const { changedEntries, unchangedEntries } = getChangedEntriesInReport(results);

  const changedOutput = changedEntries
    .map(result => {
      let generatedContent = stripIndents`
          <tr>
            <td>${result.file}</td>
            <td class="failed">❌ Failed</td>
            <td>`;

      if (result.error) {
        generatedContent += `<p>${result.error}</p>`;
        generatedContent += `<div class="image-container">`;
        if (result.changeType === 'add') {
          generatedContent += renderImage(
            result.file,
            createRelativeImagePath(options.paths.relative.outputPath, options.paths.relative.actualDir),
            'actual',
          );
        }
        if (result.changeType === 'remove') {
          generatedContent += renderImage(
            result.file,
            createRelativeImagePath(options.paths.relative.outputPath, options.paths.relative.outputBaselineDir),
            'baseline',
          );
        }
        generatedContent += `</div>`;
      }

      if (result.diffPixels) {
        generatedContent += `<p>Diff pixels: ${result.diffPixels}</p>`;
        generatedContent += `<div class="image-container">`;
        generatedContent += renderImage(
          result.file,
          createRelativeImagePath(options.paths.relative.outputPath, options.paths.relative.outputBaselineDir),
          'baseline',
        );
        generatedContent += renderImage(
          result.file,
          createRelativeImagePath(options.paths.relative.outputPath, options.paths.relative.actualDir),
          'actual',
        );
        generatedContent += renderImage(
          result.file,
          createRelativeImagePath(options.paths.relative.outputPath, options.paths.relative.diffDir),
          'diff',
        );

        generatedContent += `</div>`;
      }

      generatedContent += `</td></tr>`;

      return generatedContent;
    })
    .join('\n');

  const unchangedOutput = unchangedEntries
    .map(result => {
      const generatedContent = stripIndents`
          <tr>
            <td>${result.file}</td>
            <td class="passed>Passed</td>
            <td></td>
          </tr>`;

      return generatedContent;
    })
    .join('\n');

  const renderedHTML = render(template, { changed: changedOutput, unchanged: unchangedOutput });
  const reportPath = join(options.paths.absolute.outputPath, reporterFileNames.html);
  writeFileSync(reportPath, renderedHTML);
  console.log(`HTML report generated: ${reportPath}`);

  function renderImage(fileName: string, relativeFileRootUrl: string, type: 'baseline' | 'actual' | 'diff') {
    const sanitizedFileName = encodeURIComponent(fileName);

    return stripIndents`
      <figure>
        <figcaption>${type.toLocaleUpperCase()}</figcaption>
        <img src="${join(relativeFileRootUrl, sanitizedFileName)}" alt="${type}">
      </figure>`;
  }
}

export function generateJsonReport(results: Result[], options: Options) {
  const reportPathFile = join(options.paths.absolute.outputPath, options.reportFileName);
  const report: Report = { results, metadata: options.metadata };
  writeFileSync(reportPathFile, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`JSON report generated: ${reportPathFile}`);
}

export function generateCliReport(results: Result[], options: Options) {
  const { changedEntries } = getChangedEntriesInReport(results);
  const table = new Table({
    colAligns: ['left', 'left', 'right'],
    head: ['File', 'Status', 'Details'],
  });

  changedEntries.forEach(result => {
    let details = '';

    if (!result.passed) {
      if (result.error) {
        details += result.error;
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

function createRelativeImagePath(outputRootDir: string, imageDirectory: string): string {
  try {
    const relativePath = relative(outputRootDir, imageDirectory);
    // Add a trailing slash for directory access
    return join(relativePath, '/');
  } catch (error) {
    console.error('Error creating relative path:', error);
    return '';
  }
}

function getChangedEntriesInReport(results: Result[]): { changedEntries: Result[]; unchangedEntries: Result[] } {
  const { changedEntries, unchangedEntries } = results.reduce<{
    changedEntries: Result[];
    unchangedEntries: Result[];
  }>(
    (acc, reportEntry) => {
      if (reportEntry.passed) {
        acc.unchangedEntries.push(reportEntry);
        return acc;
      }

      acc.changedEntries.push(reportEntry);
      return acc;
    },
    { changedEntries: [], unchangedEntries: [] },
  );

  return {
    changedEntries,
    unchangedEntries,
  };
}
