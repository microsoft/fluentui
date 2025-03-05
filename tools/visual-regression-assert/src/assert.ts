import { render } from 'ejs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';

import { PNG } from 'pngjs';

interface Result {
  passed: boolean;
  diffPixels?: any;
  diffPath?: string;
  file: any;
  changeType?: 'add' | 'diff' | 'remove';
  error?: string;
}

function stripIndents(strings: { raw: readonly string[] }, ...values: string[]) {
  return String.raw(strings, ...values)
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
}

async function loadPixelmatch() {
  const pixelmatch = (await import('pixelmatch')).default;
  return pixelmatch;
}

async function compareSnapshots(
  baselinePath: string,
  actualPath: string,
  diffPath: string,
): Promise<Omit<Result, 'file'>> {
  try {
    const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath));
    const actualImg = PNG.sync.read(fs.readFileSync(actualPath));
    const { width, height } = baselineImg;

    if (actualImg.width !== width || actualImg.height !== height) {
      return { passed: false, error: 'Image dimensions mismatch', changeType: 'diff' };
    }

    const diff = new PNG({ width, height });
    const pixelmatch = await loadPixelmatch();
    const numDiffPixels = pixelmatch(baselineImg.data, actualImg.data, diff.data, width, height, { threshold: 0.1 });

    if (numDiffPixels > 0) {
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      return {
        passed: false,
        changeType: 'diff',
        diffPixels: numDiffPixels,
        diffPath: diffPath,
      };
    }

    if (fs.existsSync(diffPath)) {
      fs.unlinkSync(diffPath);
    }

    return { passed: true };
  } catch (error) {
    return { passed: false, error: (error as Error).message };
  }
}

function generateJsonReport(
  results: Result[],
  paths: {
    absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
  },
) {
  const reportPath = paths.absolute.reportPath.replace('html', 'json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`JSON report generated: ${reportPath}`);
}

function generateMarkdownReport(
  results: Result[],
  paths: {
    absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
  },
) {
  const template = fs.readFileSync(path.join(__dirname, 'template/report.md__tmpl__'), 'utf-8');
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
  fs.writeFileSync(reportPath, renderedMD, 'utf-8');

  console.log(`Markdown report generated: ${reportPath}`);
}

function generateHtmlReport(
  results: Result[],
  paths: {
    absolute: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
    relative: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string };
  },
) {
  const template = fs.readFileSync(path.join(__dirname, 'template/report.html__tmpl__'), 'utf-8');
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
          generatedContent += `<figure><figcaption>Baseline</figcaption><img src="${path.join(
            images.baseline,
            sanitizedFileName,
          )}" alt="Baseline"></figure>`;
          generatedContent += `<figure><figcaption>Actual</figcaption><img src="${path.join(
            images.actual,
            sanitizedFileName,
          )}" alt="Actual"></figure>`;
          generatedContent += `<figure><figcaption>Diff</figcaption><img src="${path.join(
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

  fs.writeFileSync(paths.absolute.reportPath, renderedHTML);
  console.log(`HTML report generated: ${paths.absolute.reportPath}`);
}

function createRelativeImagePath(reportFilePath: string, imageDirectory: string) {
  try {
    const reportDir = path.dirname(reportFilePath);
    const relativePath = path.relative(reportDir, imageDirectory);
    return path.join(relativePath, '/'); // Add a trailing slash for directory access
  } catch (error) {
    console.error('Error creating relative path:', error);
    return ''; // Return an empty string in case of an error
  }
}

export async function runSnapshotTests(
  baselineDir: string,
  actualDir: string,
  diffDir: string,
  reportPath: string,
  updateSnapshots: boolean,
) {
  const relativePaths = {
    baselineDir,
    actualDir,
    diffDir,
    reportPath,
  };
  const normalizedPaths = {
    baselineDir: path.join(cwd(), relativePaths.baselineDir),
    actualDir: path.join(cwd(), relativePaths.actualDir),
    diffDir: path.join(cwd(), relativePaths.diffDir),
    reportPath: path.join(cwd(), relativePaths.reportPath),
  };

  if (!fs.existsSync(normalizedPaths.baselineDir)) {
    fs.mkdirSync(normalizedPaths.baselineDir, { recursive: true });
  }

  const baselineFiles = fs.readdirSync(normalizedPaths.baselineDir);
  const actualFiles = fs.readdirSync(normalizedPaths.actualDir);
  let allPassed = true;
  const results: Result[] = [];

  if (!fs.existsSync(normalizedPaths.diffDir)) {
    fs.mkdirSync(normalizedPaths.diffDir, { recursive: true });
  }

  // if (baselineFiles.length === 0) {
  //   console.info('No Baseline Exist yet! Create baseline by running `--update-snapshots`');
  // }

  const removedFilesFromBaseline = baselineFiles.filter(file => {
    if (!actualFiles.includes(file)) {
      if (!updateSnapshots) {
        results.push({
          file,
          passed: updateSnapshots ? true : false,
          error: updateSnapshots ? undefined : 'Remove Snapshot',
          changeType: 'remove',
        });
        allPassed = false;
      } else {
        const baselinePath = path.join(normalizedPaths.baselineDir, file);
        fs.unlinkSync(baselinePath);
      }
    }
  });

  if (removedFilesFromBaseline.length > 0) {
    console.error(`Removed snapshots: ${removedFilesFromBaseline.join(', ')}`);
  }

  for (const file of actualFiles) {
    if (!file.endsWith('.png')) {
      throw new Error(`Only png files are supported - ${file}`);
    }

    const baselinePath = path.join(normalizedPaths.baselineDir, file);
    const actualPath = path.join(normalizedPaths.actualDir, file);
    const diffPath = path.join(normalizedPaths.diffDir, file);

    if (!fs.existsSync(baselinePath)) {
      results.push({
        file,
        passed: updateSnapshots ? true : false,
        error: updateSnapshots ? undefined : 'New Snapshot',
        changeType: 'add',
      });
      if (!updateSnapshots) {
        allPassed = false;
      } else {
        fs.copyFileSync(actualPath, baselinePath);
      }
      continue;
    }

    const result = await compareSnapshots(baselinePath, actualPath, diffPath);
    results.push({ file, ...result });

    if (!result.passed) {
      allPassed = false;
    }
  }

  generateJsonReport(results, { absolute: normalizedPaths, relative: relativePaths });
  generateHtmlReport(results, { absolute: normalizedPaths, relative: relativePaths });
  generateMarkdownReport(results, { absolute: normalizedPaths, relative: relativePaths });

  if (!allPassed) {
    throw new Error(`snapshots contain diff`);
  }
}
