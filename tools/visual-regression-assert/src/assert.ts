import { join } from 'node:path';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
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
    const baselineImg = PNG.sync.read(readFileSync(baselinePath));
    const actualImg = PNG.sync.read(readFileSync(actualPath));
    const { width, height } = baselineImg;

    if (actualImg.width !== width || actualImg.height !== height) {
      return { passed: false, error: 'Image dimensions mismatch', changeType: 'diff' };
    }

    const diff = new PNG({ width, height });
    const pixelmatch = await loadPixelmatch();
    const numDiffPixels = pixelmatch(baselineImg.data, actualImg.data, diff.data, width, height, { threshold: 0.1 });

    if (numDiffPixels > 0) {
      writeFileSync(diffPath, PNG.sync.write(diff));
      return {
        passed: false,
        error: 'Image diff',
        changeType: 'diff',
        diffPixels: numDiffPixels,
        diffPath: diffPath,
      };
    }

    if (existsSync(diffPath)) {
      unlinkSync(diffPath);
    }

    return { passed: true };
  } catch (error) {
    return { passed: false, error: (error as Error).message };
  }
}

export async function runSnapshotTests(options: {
  baselineDir: string;
  actualDir: string;
  diffDir: string;
  reportPath: string;
  reportFileName: string;
  updateSnapshots: boolean;
}) {
  const { updateSnapshots, reportFileName, ...relativePaths } = options;

  if (updateSnapshots) {
    console.info('======================');
    console.info('💡 UPDATING SNAPSHOTS!');
    console.info('======================');
  }

  const normalizedPaths = {
    baselineDir: join(cwd(), relativePaths.baselineDir),
    actualDir: join(cwd(), relativePaths.actualDir),
    diffDir: join(cwd(), relativePaths.diffDir),
    reportPath: join(cwd(), relativePaths.reportPath),
  };

  const packageMeta = getPackageMetadata(normalizedPaths.reportPath);

  const metadata = {
    paths: normalizedPaths,
    project: packageMeta,
  };

  if (!existsSync(normalizedPaths.baselineDir)) {
    mkdirSync(normalizedPaths.baselineDir, { recursive: true });
  }

  const baselineFiles = readdirSync(normalizedPaths.baselineDir);
  const actualFiles = readdirSync(normalizedPaths.actualDir);
  let allPassed = true;
  const results: Result[] = [];

  if (!existsSync(normalizedPaths.diffDir)) {
    mkdirSync(normalizedPaths.diffDir, { recursive: true });
  }

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
        const baselinePath = join(normalizedPaths.baselineDir, file);
        unlinkSync(baselinePath);
      }
    }
  });

  if (removedFilesFromBaseline.length > 0) {
    console.error(`🧹 Removed snapshots: ${removedFilesFromBaseline.join(', ')}`);
  }

  for (const file of actualFiles) {
    if (!file.endsWith('.png')) {
      throw new Error(`Only png files are supported - ${file}`);
    }

    const baselinePath = join(normalizedPaths.baselineDir, file);
    const actualPath = join(normalizedPaths.actualDir, file);
    const diffPath = join(normalizedPaths.diffDir, file);

    if (!existsSync(baselinePath)) {
      results.push({
        file,
        passed: updateSnapshots ? true : false,
        error: updateSnapshots ? undefined : 'New Snapshot',
        changeType: 'add',
      });
      if (!updateSnapshots) {
        allPassed = false;
      } else {
        copyFileSync(actualPath, baselinePath);
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
    return { passed: false };
  }

  return { passed: true };
}
