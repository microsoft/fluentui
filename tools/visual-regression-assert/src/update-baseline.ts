import { readFileSync } from 'node:fs';
import { cp, rm } from 'node:fs/promises';
import { join, isAbsolute, basename } from 'node:path';
import { cwd } from 'node:process';

import { rootReportName } from './shared';
import { RootReport } from './types';
import { findGitRoot } from './utils';

/**
 *
 * @param reportPath - absolute path to report folder downloaded from CI
 */
export function updateBaseline(reportPath: string) {
  const repoRoot = findGitRoot(cwd());

  const reportDirAbsolutePath = isAbsolute(reportPath) ? reportPath : join(cwd(), reportPath);
  const reportJsonPath = join(reportDirAbsolutePath, rootReportName);

  const reportRaw = readFileSync(reportJsonPath, 'utf-8');
  const reportJson: RootReport = JSON.parse(reportRaw);

  const ioAsyncExec: Array<Promise<void>> = [];
  const entries = Object.entries(reportJson);
  for (const [project, report] of entries) {
    const reportProjectFolder = project.replace(/^@[a-z-]+\//, '');

    for (const result of report.results) {
      const from = join(
        reportDirAbsolutePath,
        reportProjectFolder,
        basename(report.metadata.paths.actualDir),
        result.file,
      );
      const to = join(repoRoot, report.metadata.paths.baselineDir, result.file);

      if (result.changeType === 'add') {
        console.log('ADD', { from, to });
        ioAsyncExec.push(cp(from, to));
      }
      if (result.changeType === 'remove') {
        const removeImgPath = join(repoRoot, report.metadata.paths.baselineDir, result.file);
        console.log('REMOVE', { removeImgPath });
        ioAsyncExec.push(rm(removeImgPath));
      }
      if (result.changeType === 'diff' || result.changeType === 'dimensions-diff') {
        console.log('DIFF', { from, to });
        ioAsyncExec.push(cp(from, to, { force: true }));
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
