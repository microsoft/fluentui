import { join } from 'node:path';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { cwd } from 'node:process';

import { PNG } from 'pngjs';

import { getPackageMetadata, loadPixelmatch } from './utils';
import { Metadata, Result } from './types';
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
      return { passed: false, error: 'Image dimensions mismatch', changeType: 'dimensions-diff' };
    }

    const diff = new PNG({ width, height });
    const pixelmatch = await loadPixelmatch();
    const numDiffPixels = pixelmatch(baselineImg.data, actualImg.data, diff.data, width, height, { threshold: 0.1 });

    if (numDiffPixels > 0) {
      writeFileSync(diffPath, PNG.sync.write(diff));
      return {
        passed: false,
        error: `Diff pixels: ${numDiffPixels}`,
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
    console.error(error);
    return { passed: false, error: (error as Error).message };
  }
}

export async function runSnapshotTests(options: {
  baselineDir: string;
  outputPath: string;
  reportFileName: string;
  updateSnapshots: boolean;
}) {
  const { updateSnapshots, reportFileName, baselineDir, outputPath } = options;

  const relativePaths = {
    baselineDir,
    outputPath,
    outputBaselineDir: join(outputPath, 'baseline'),
    actualDir: join(outputPath, 'actual'),
    diffDir: join(outputPath, 'diff'),
  };

  const normalizedPaths = {
    outputPath: join(cwd(), outputPath),
    baselineDir: join(cwd(), relativePaths.baselineDir),
    outputBaselineDir: join(cwd(), relativePaths.outputBaselineDir),
    actualDir: join(cwd(), relativePaths.actualDir),
    diffDir: join(cwd(), relativePaths.diffDir),
  };

  if (!existsSync(normalizedPaths.actualDir)) {
    throw new Error(
      `actualDir "${normalizedPaths.actualDir}" doesn't exist. Make sure to provide images for assertion`,
    );
  }

  const metadata: Metadata = {
    paths: normalizedPaths,
    project: getPackageMetadata(normalizedPaths.outputPath),
  };

  if (updateSnapshots) {
    console.info('======================');
    console.info('💡 UPDATING SNAPSHOTS!');
    console.info('======================');
  }

  if (!existsSync(normalizedPaths.baselineDir)) {
    mkdirSync(normalizedPaths.baselineDir, { recursive: true });
  }

  if (!existsSync(normalizedPaths.outputBaselineDir)) {
    mkdirSync(normalizedPaths.outputBaselineDir, { recursive: true });
  } else {
    rmSync(normalizedPaths.outputBaselineDir, { recursive: true });
    mkdirSync(normalizedPaths.outputBaselineDir, { recursive: true });
  }

  if (!existsSync(normalizedPaths.diffDir)) {
    mkdirSync(normalizedPaths.diffDir, { recursive: true });
  } else {
    rmSync(normalizedPaths.diffDir, { recursive: true });
    mkdirSync(normalizedPaths.diffDir, { recursive: true });
  }

  const baselineFiles = readdirSync(normalizedPaths.baselineDir);
  const actualFiles = readdirSync(normalizedPaths.actualDir);
  let allPassed = true;
  const results: Result[] = [];

  const removedFilesFromBaseline = baselineFiles.filter(file => {
    if (!file.endsWith('.png')) {
      throw new Error(`Only png files are supported - ${file}`);
    }

    if (!actualFiles.includes(file)) {
      const baselinePath = join(normalizedPaths.baselineDir, file);
      if (!updateSnapshots) {
        // copy baseline img that is being removed to our reports /baseline folder
        copyFileSync(baselinePath, join(normalizedPaths.outputBaselineDir, file));
        results.push({
          file,
          passed: updateSnapshots ? true : false,
          error: updateSnapshots ? undefined : 'Remove Snapshot',
          changeType: 'remove',
        });
        allPassed = false;
      } else {
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
        copyFileSync(baselinePath, join(normalizedPaths.outputBaselineDir, file));
        allPassed = false;
      }
      results.push({ file, ...result });
    } else {
      copyFileSync(actualPath, baselinePath);
      results.push({ file, passed: true });
    }
  }

  const reportConfig = {
    metadata,
    reportFileName,
    paths: { absolute: normalizedPaths, relative: relativePaths },
  };

  generateCliReport(results, reportConfig);
  generateJsonReport(results, reportConfig);
  generateHtmlReport(results, reportConfig);
  generateMarkdownReport(results, reportConfig);

  if (!allPassed) {
    return { passed: false };
  }

  return { passed: true };
}
