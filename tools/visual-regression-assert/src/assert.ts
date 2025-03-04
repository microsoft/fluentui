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

function generateHtmlReport(
  results: Result[],
  paths: { baselineDir: string; actualDir: string; diffDir: string; reportPath: string },
) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Visual Regression Report</title>
      <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        table {
            width: 90%;
            max-width: 800px;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        tr:hover {
            background-color: #e9ecef;
            transition: 0.2s;
        }

        td {
            border-bottom: 1px solid #ddd;
        }

        @media (max-width: 600px) {
            table {
                width: 100%;
            }

            th, td {
                padding: 8px;
            }
        }
        .passed { color: green; }
        .failed { color: red; }
        .image-container { display: flex; flex-wrap: wrap; }
        .image-container img { max-width: 300px; margin: 10px; }
      </style>
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
  `;

  results.forEach(result => {
    html += `
          <tr>
            <td>${result.file}</td>
            <td class="${result.passed ? 'passed' : 'failed'}">${result.passed ? 'Passed' : 'Failed'}</td>
            <td>`;

    if (!result.passed) {
      if (result.error) {
        html += `<p>Error: ${result.error}</p>`;
      }
      if (result.diffPixels) {
        html += `<p>Diff pixels: ${result.diffPixels}</p>`;
        html += `<div class="image-container">`;
        html += `<figure><figcaption>Baseline</<figcaption><img src="${paths.baselineDir}/${result.file}" alt="Baseline"></figure>`;
        html += `<figure><figcaption>Actual</<figcaption><img src="${paths.actualDir}/${result.file}" alt="Actual"></figure>`;
        html += `<figure><figcaption>Diff</<figcaption><img src="${paths.diffDir}/${result.file}" alt="Diff"></figure>`;
        html += `</div>`;
      }
    }

    html += `</td></tr>`;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  fs.writeFileSync(paths.reportPath, html);
  console.log(`HTML report generated: ${paths.reportPath}`);
}

export async function runSnapshotTests(
  baselineDir: string,
  actualDir: string,
  diffDir: string,
  reportPath: string,
  updateSnapshots: boolean,
) {
  const normalizedPaths = {
    baselineDir: path.join(cwd(), baselineDir),
    actualDir: path.join(cwd(), actualDir),
    diffDir: path.join(cwd(), diffDir),
    reportPath: path.join(cwd(), reportPath),
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

  fs.writeFileSync(reportPath.replace('html', 'json'), JSON.stringify(results, null, 2), 'utf-8');
  generateHtmlReport(results, normalizedPaths);

  if (!allPassed) {
    throw new Error(`snapshots contain diff`);
  }
}
