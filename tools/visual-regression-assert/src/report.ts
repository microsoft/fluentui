import { glob } from 'glob';

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { findGitRoot } from './utils';
import { type Report, type RootReport } from './types';
import { reporterFileNames, rootReportName } from './shared';

export async function prepareReport(reportFilesGlob: string, outputPath: string) {
  const root = findGitRoot(process.cwd());
  const absoluteRootPath = join(root, outputPath);

  const reportFiles = glob.sync(reportFilesGlob, { absolute: true, cwd: root });
  const reports = reportFiles.reduce<RootReport>((acc, reportFile) => {
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
      console.log(`Copy project report to: ${join(absoluteRootPath, projectNameWithoutScope)}`);
      cpSync(report.metadata.paths.outputPath, join(absoluteRootPath, projectNameWithoutScope), { recursive: true });

      // update markdownReport
      const projectMdReport = readFileSync(join(report.metadata.paths.outputPath, reporterFileNames.markdown), 'utf-8');
      markdownReport = markdownReport + `## ${projectNameWithoutScope}\n\n` + projectMdReport + '\n\n';
    });
  } else {
    markdownReport += 'No Regressions found ✅';
  }

  const jsonReportPath = join(absoluteRootPath, rootReportName);
  const markdownReportPath = join(absoluteRootPath, rootReportName.replace('.json', '.md'));
  console.log('Creating reports:');
  console.log(`- ${jsonReportPath}`);
  console.log(`- ${markdownReportPath}`);

  writeFileSync(jsonReportPath, JSON.stringify(reports, null, 2));
  writeFileSync(markdownReportPath, markdownReport);
}
