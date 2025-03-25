import { readFileSync } from 'node:fs';
import { cp, rm } from 'node:fs/promises';
import { join, isAbsolute, basename, normalize } from 'node:path';
import { cwd } from 'node:process';

import { rootReportName } from './shared';
import type { RootReport } from './types';
import { findGitRoot } from './utils';

/**
 *
 * @param reportPath - absolute path to report folder downloaded from CI
 */
export async function updateBaseline(reportPath: string): Promise<{ success: boolean }> {
  const repoRoot = findGitRoot(cwd());

  const reportDirAbsolutePath = isAbsolute(reportPath) ? reportPath : join(cwd(), reportPath);
  const reportJsonPath = join(reportDirAbsolutePath, rootReportName);

  const reportRaw = readFileSync(reportJsonPath, 'utf-8');
  const reportJson: RootReport = JSON.parse(reportRaw);

  const ioAsyncExec: Array<Promise<void>> = [];
  const entries = Object.entries(reportJson);
  for (const [project, report] of entries) {
    const reportProjectFolder = project.replace(/^@[a-z-]+\//, '');
    const crossOsPath = {
      baselineDir: normalize(report.metadata.paths.baselineDir),
      actualDir: normalize(report.metadata.paths.actualDir),
    };

    for (const result of report.results) {
      const from = join(reportDirAbsolutePath, reportProjectFolder, basename(crossOsPath.actualDir), result.file);
      const to = join(repoRoot, crossOsPath.baselineDir, result.file);

      if (result.changeType === 'add') {
        ioAsyncExec.push(cp(from, to));
      }
      if (result.changeType === 'diff' || result.changeType === 'dimensions-diff') {
        ioAsyncExec.push(cp(from, to, { force: true }));
      }
      if (result.changeType === 'remove') {
        ioAsyncExec.push(rm(to));
      }
    }
  }

  return Promise.all(ioAsyncExec)
    .then(_ => {
      return { success: true };
    })
    .catch(err => {
      console.error(err);
      return { success: false };
    });
}
