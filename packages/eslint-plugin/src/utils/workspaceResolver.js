// @ts-check
const fs = require('node:fs');
const path = require('node:path');
const minimatch = require('minimatch');

/**
 * Find workspace manifests from the source file, not the process working directory.
 * @param {string} filename
 * @returns {Record<string, string>}
 */
function getWorkspacePackages(filename) {
  let directory = path.dirname(filename);
  while (true) {
    const manifest = path.join(directory, 'package.json');
    if (fs.existsSync(manifest)) {
      const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      const patterns = Array.isArray(pkg.workspaces) ? pkg.workspaces : pkg.workspaces?.packages;
      if (patterns) {
        const excluded = patterns.filter((/** @type {string} */ pattern) => pattern.startsWith('!'));
        const manifests = fs.globSync(
          patterns
            .filter((/** @type {string} */ pattern) => !pattern.startsWith('!'))
            .map((/** @type {string} */ pattern) => `${pattern}/package.json`),
          { cwd: directory },
        );
        /** @type {Record<string, string>} */
        const packages = Object.create(null);
        for (const relativeManifest of manifests) {
          const relativeDirectory = path.dirname(relativeManifest).split(path.sep).join('/');
          if (excluded.some((/** @type {string} */ pattern) => minimatch(relativeDirectory, pattern.slice(1)))) {
            continue;
          }
          const workspaceManifest = path.join(directory, relativeManifest);
          const workspace = JSON.parse(fs.readFileSync(workspaceManifest, 'utf8'));
          if (workspace.name) {
            if (packages[workspace.name] && packages[workspace.name] !== workspaceManifest) {
              throw new Error(`Duplicate workspace package '${workspace.name}' in ${directory}.`);
            }
            packages[workspace.name] = workspaceManifest;
          }
        }
        return packages;
      }
    }
    const parent = path.dirname(directory);
    if (parent === directory) {
      return {};
    }
    directory = parent;
  }
}

module.exports = {
  interfaceVersion: 2,
  getWorkspacePackages,
  /**
   * This resolver is scoped to dependency declarations, not import validity.
   * The upstream rule only needs a real package manifest, never its built entry point.
   * @param {string} source
   * @param {string} filename
   * @param {{packages: Record<string, string>}} options
   */
  resolve(source, filename, options) {
    const packageName = source.match(/^(@[^/]+\/[^/]+|[^./@][^/:]*)(?:\/|$)/)?.[1];
    const manifest = packageName && options.packages[packageName];
    return manifest ? { found: true, path: manifest } : { found: false };
  },
};
