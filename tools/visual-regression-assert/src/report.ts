import { glob } from 'glob';

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { findGitRoot } from './utils';
import { Report } from './types';

export async function prepareReport(reportFilesGlob: string, outputPath: string) {
  const rootReportName = 'vrt-report.json';
  const root = findGitRoot(process.cwd());
  const absoluteRootPath = join(root, outputPath);

  const reportFiles = glob.sync(reportFilesGlob, { absolute: true, cwd: root });
  const reports = reportFiles.reduce<Record<string, Report>>((acc, reportFile) => {
    const data: Report = JSON.parse(readFileSync(reportFile, 'utf-8'));
    acc[data.metadata.project.name] = data;

    return acc;
  }, {});

  if (!existsSync(absoluteRootPath)) {
    mkdirSync(absoluteRootPath, { recursive: true });
  } else {
    rmSync(absoluteRootPath, { recursive: true });
    mkdirSync(absoluteRootPath, { recursive: true });
  }

  const reportEntries = Object.entries(reports);
  let markdownReport = '# Visual Regression Repo Report\n\n';

  if (reportEntries.length) {
    reportEntries.forEach(([project, report]) => {
      const projectNameWithoutScope = project.replace(/^@[a-z-]+\//, '');
      // copy project report
      cpSync(
        // TODO - resolve this hard coded path from metadata paths
        join(report.metadata.project.root, 'dist/vrt'),
        join(absoluteRootPath, projectNameWithoutScope),
        { recursive: true },
      );

      // update markdownReport
      const projectMdReport = readFileSync(report.metadata.paths.reportPath.replace('.html', '.md'), 'utf-8');
      markdownReport = markdownReport + `## ${projectNameWithoutScope}\n\n` + projectMdReport + '\n\n';
    });
  } else {
    markdownReport += 'No Regressions found ✅';
  }

  writeFileSync(join(absoluteRootPath, rootReportName), JSON.stringify(reports, null, 2));
  writeFileSync(join(absoluteRootPath, rootReportName.replace('.json', '.md')), markdownReport);
}
