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
 * @return {Promise<[string, BuildResult[]]>}
 */
async function readReportForPackage(reportFile) {
  const reportFilePath = path.resolve(process.cwd(), reportFile);

  const packageName = path.basename(/** @type {string}*/ (findPackageRoot(reportFilePath)));
  const packageReport = JSON.parse((await fs.readFile(reportFilePath)).toString());

  return [packageName, packageReport];
}

/**
 * Collects all reports for packages to a single one.
 *
 * @return {Promise<BundleSizeReport>}
 */
async function collectLocalReport() {
  /** @type {string[]} */
  const reportFiles = glob.sync('packages/*/dist/bundle-size/bundle-size.json', {
    cwd: /** @type {string} */ (findGitRoot(process.cwd())),
  });

  /** @type {[string, BuildResult[]][]} */
  const reports = await Promise.all(reportFiles.map(readReportForPackage));

  return reports.reduce(
    (/** @type {BundleSizeReport} */ acc, [/** @type {string} */ packageName, /** @type {BuildResult[]} */ report]) => {
      return [...acc, ...report.map(reportEntry => ({ packageName, ...reportEntry }))];
    },
    /** @type {BundleSizeReport} */ [],
  );
}

module.exports = collectLocalReport;
