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

  try {
    const packageName = path.basename(packageRoot);
    const packageReportJSON = await fs.readFile(reportFilePath, 'utf8');
    /** @type {BuildResult[]} */
    const packageReport = JSON.parse(packageReportJSON);

    return { packageName, packageReport };
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error([`Invalid JSON in "${reportFilePath}"`, err.toString()].join('\n'));
    }
    if (err instanceof Error) {
      throw new Error([`Failed to read JSON from "${reportFilePath}":`, err.toString()].join('\n'));
    }
    throw new Error(`Unexpected error: ${err}`);
  }
}

const collectLocalReportDefaultOptions = {
  root: /** @type {string | undefined} */ (undefined),
  reportFilesGlob: 'packages/**/dist/bundle-size/bundle-size.json',
};
/**
 * Collects all reports for packages to a single one.
 *
 * @param {Partial<typeof collectLocalReportDefaultOptions>} options
 * @return {Promise<BundleSizeReport>}
 */
async function collectLocalReport(options = {}) {
  const { reportFilesGlob, root = findGitRoot(process.cwd()) } = { ...collectLocalReportDefaultOptions, ...options };
  const reportFiles = glob.sync(reportFilesGlob, {
    cwd: root,
  });

  const reports = await Promise.all(reportFiles.map(readReportForPackage));

  return reports.reduce((acc, { packageName, packageReport }) => {
    const processedReport = packageReport.map(reportEntry => ({ packageName, ...reportEntry }));

    return [...acc, ...processedReport];
  }, /** @type {BundleSizeReport} */ ([]));
}

module.exports = collectLocalReport;
