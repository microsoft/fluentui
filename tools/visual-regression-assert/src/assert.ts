import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';

import { PNG } from 'pngjs';
import { getPackageMetadata, loadPixelmatch } from './utils';
import { Result } from './types';
import { generateCliReport, generateHtmlReport, generateJsonReport, generateMarkdownReport } from './reporters';

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

export async function runSnapshotTests(
  baselineDir: string,
  actualDir: string,
  diffDir: string,
  reportPath: string,
  reportFileName: string,
  updateSnapshots: boolean,
) {
  if (updateSnapshots) {
    console.info('======================');
    console.info('💡 UPDATING SNAPSHOTS!');
    console.info('======================');
  }

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

  const packageMeta = getPackageMetadata(normalizedPaths.reportPath);

  const metadata = {
    paths: normalizedPaths,
    project: packageMeta,
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

    if (!updateSnapshots) {
      const result = await compareSnapshots(baselinePath, actualPath, diffPath);
      if (!result.passed) {
        allPassed = false;
      }
      results.push({ file, ...result });
    } else {
      results.push({ file, passed: true });
    }
  }

  generateCliReport(results, {
    metadata,
    reportFileName,
    paths: { absolute: normalizedPaths, relative: relativePaths },
  });

  generateJsonReport(results, {
    metadata,
    reportFileName,
    paths: { absolute: normalizedPaths, relative: relativePaths },
  });
  generateHtmlReport(results, { absolute: normalizedPaths, relative: relativePaths });
  generateMarkdownReport(results, { absolute: normalizedPaths, relative: relativePaths });

  if (!allPassed) {
    throw new Error(`snapshots contain diff`);
  }
}
