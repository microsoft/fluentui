const fs = require('fs').promises;
const glob = require('glob');
const path = require('path');
const { findGitRoot, findPackageRoot } = require('workspace-tools');

/** @typedef {import('../utils/buildFixture').BuildResult} BuildResult */

/** @typedef {BuildResult & { packageName: string }} BundleSizeReportEntry */
/** @typedef {BundleSizeReportEntry[]} BundleSizeReport */

/**
 * @param {string} reportFile
 *
 * @return {Promise<{ packageName: string, packageReport: BuildResult[] }>}
 */
async function readReportForPackage(reportFile) {
  const reportFilePath = path.resolve(process.cwd(), reportFile);
  const packageRoot = findPackageRoot(reportFilePath);

  if (!packageRoot) {
    throw new Error(
      [
        'Failed to find a package root (directory that contains "package.json" file)',
        `Report file location: ${reportFile}`,
      ].join('\n'),
    );
  }

  const packageName = path.basename(packageRoot);
  const packageReportJSON = await fs.readFile(reportFilePath, 'utf8');

  try {
    /** @type {BuildResult[]} */
    const packageReport = JSON.parse(packageReportJSON);

    return { packageName, packageReport };
  } catch (e) {
    throw new Error([`Failed to read JSON from "${reportFilePath}":`, e.toString()].join('\n'));
  }
}

/**
 * Collects all reports for packages to a single one.
 *
 * @return {Promise<BundleSizeReport>}
 */
async function collectLocalReport() {
  /** @type {string[]} */
  const reportFiles = glob.sync('packages/**/dist/bundle-size/bundle-size.json', {
    cwd: /** @type {string} */ (findGitRoot(process.cwd())),
  });

  const reports = await Promise.all(reportFiles.map(readReportForPackage));

  return reports.reduce((acc, { packageName, packageReport }) => {
    const processedReport = packageReport.map(reportEntry => ({ packageName, ...reportEntry }));

    return [...acc, ...processedReport];
  }, /** @type {BundleSizeReport} */ ([]));
}

module.exports = collectLocalReport;
