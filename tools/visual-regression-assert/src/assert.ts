import * as fs from 'node:fs';
import * as path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

async function compareSnapshots(baselinePath: string, actualPath: string, diffPath: string) {
  try {
    const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath));
    const actualImg = PNG.sync.read(fs.readFileSync(actualPath));
    const { width, height } = baselineImg;

    if (actualImg.width !== width || actualImg.height !== height) {
      return { passed: false, error: 'Image dimensions mismatch' };
    }

    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(baselineImg.data, actualImg.data, diff.data, width, height, { threshold: 0.1 });

    if (numDiffPixels > 0) {
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      return {
        passed: false,
        diffPixels: numDiffPixels,
        diffPath: diffPath,
      };
    } else {
      if (fs.existsSync(diffPath)) {
        fs.unlinkSync(diffPath);
      }
      return { passed: true };
    }
  } catch (error) {
    return { passed: false, error: (error as Error).message };
  }
}

function generateHtmlReport(
  results: {
    passed: boolean;
    diffPixels?: any;
    diffPath?: string;
    file: any;
    error?: string;
  }[],
  reportPath: string,
) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Snapshot Comparison Report</title>
      <style>
        body { font-family: sans-serif; }
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
        html += `<img src="./snapshots/baseline/${result.file}" alt="Baseline">`;
        html += `<img src="./snapshots/actual/${result.file}" alt="Actual">`;
        html += `<img src="./snapshots/diff/${result.file}" alt="Diff">`;
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

  fs.writeFileSync(reportPath, html);
  console.log(`HTML report generated: ${reportPath}`);
}

export async function runSnapshotTests(baselineDir: string, actualDir: string, diffDir: string, reportPath: string) {
  const baselineFiles = fs.readdirSync(baselineDir);
  let allPassed = true;
  const results = [];

  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  for (const file of baselineFiles) {
    if (file.endsWith('.png')) {
      const baselinePath = path.join(baselineDir, file);
      const actualPath = path.join(actualDir, file);
      const diffPath = path.join(diffDir, file);

      if (!fs.existsSync(actualPath)) {
        results.push({
          file,
          passed: false,
          error: 'Actual snapshot missing',
        });
        allPassed = false;
        continue;
      }

      const result = await compareSnapshots(baselinePath, actualPath, diffPath);
      results.push({ file, ...result });
      if (!result.passed) {
        allPassed = false;
      }
    }
  }

  generateHtmlReport(results, reportPath);

  if (!allPassed) {
    process.exitCode = 1;
  }
}
