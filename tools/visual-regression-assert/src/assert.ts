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

import { createMetadataForReport, findGitRoot, loadPixelmatch } from './utils';
import type { Result } from './types';
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
        diffPath,
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

interface Options {
  baselineDir: string;
  /**
   * relative path where report output should be created
   */
  outputPath: string;
  reportFileName: string;
  updateSnapshots: boolean;
}

export async function runSnapshotTests(options: Options): Promise<{ success: boolean }> {
  const { updateSnapshots, reportFileName, baselineDir, outputPath } = options;

  const relativePaths = {
    baselineDir,
    outputPath,
    outputBaselineDir: join(outputPath, 'baseline'),
    actualDir: join(outputPath, 'actual'),
    diffDir: join(outputPath, 'diff'),
  };
  const workDir = cwd();

  const absolutePaths = {
    outputPath: join(workDir, outputPath),
    baselineDir: join(workDir, relativePaths.baselineDir),
    outputBaselineDir: join(workDir, relativePaths.outputBaselineDir),
    actualDir: join(workDir, relativePaths.actualDir),
    diffDir: join(workDir, relativePaths.diffDir),
  };

  if (!existsSync(absolutePaths.actualDir)) {
    throw new Error(`actualDir "${absolutePaths.actualDir}" doesn't exist. Make sure to provide images for assertion`);
  }

  const metadata = createMetadataForReport({ repoRoot: findGitRoot(workDir), absolutePaths });

  if (updateSnapshots) {
    console.info('======================');
    console.info('💡 UPDATING SNAPSHOTS!');
    console.info('======================');
  }

  if (!existsSync(absolutePaths.baselineDir)) {
    mkdirSync(absolutePaths.baselineDir, { recursive: true });
  }

  if (!existsSync(absolutePaths.outputBaselineDir)) {
    mkdirSync(absolutePaths.outputBaselineDir, { recursive: true });
  } else {
    rmSync(absolutePaths.outputBaselineDir, { recursive: true });
    mkdirSync(absolutePaths.outputBaselineDir, { recursive: true });
  }

  if (!existsSync(absolutePaths.diffDir)) {
    mkdirSync(absolutePaths.diffDir, { recursive: true });
  } else {
    rmSync(absolutePaths.diffDir, { recursive: true });
    mkdirSync(absolutePaths.diffDir, { recursive: true });
  }

  const baselineFiles = readdirSync(absolutePaths.baselineDir);
  const actualFiles = readdirSync(absolutePaths.actualDir);
  let allPassed = true;
  const results: Result[] = [];

  const removedFilesFromBaseline = baselineFiles.filter(file => {
    if (!file.endsWith('.png')) {
      throw new Error(`Only png files are supported - ${file}`);
    }

    if (!actualFiles.includes(file)) {
      const baselinePath = join(absolutePaths.baselineDir, file);
      if (!updateSnapshots) {
        // copy baseline img that is being removed to our reports /baseline folder
        copyFileSync(baselinePath, join(absolutePaths.outputBaselineDir, file));
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

      return true;
    }

    return false;
  });

  if (removedFilesFromBaseline.length > 0) {
    console.error(`🧹 Removed snapshots: ${removedFilesFromBaseline.join(', ')}`);
  }

  for (const file of actualFiles) {
    if (!file.endsWith('.png')) {
      throw new Error(`Only png files are supported - ${file}`);
    }

    const baselinePath = join(absolutePaths.baselineDir, file);
    const actualPath = join(absolutePaths.actualDir, file);
    const diffPath = join(absolutePaths.diffDir, file);

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
        copyFileSync(baselinePath, join(absolutePaths.outputBaselineDir, file));
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
    paths: { absolute: absolutePaths, relative: relativePaths },
  };

  generateCliReport(results, reportConfig);
  generateJsonReport(results, reportConfig);
  generateHtmlReport(results, reportConfig);
  generateMarkdownReport(results, reportConfig);

  return { success: allPassed };
}
