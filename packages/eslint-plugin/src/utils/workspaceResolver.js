// @ts-check
const fs = require('node:fs');
const path = require('node:path');
const minimatch = require('minimatch');
const { isBuiltin } = require('node:module');

/** @type {{root: string, signature: string, packages: Record<string, string>, signatures: Map<string, string>} | undefined} */
let workspaceCache;

/** @param {string} filename */
function signature(filename) {
  const stat = fs.statSync(filename, { throwIfNoEntry: false });
  return stat ? `${stat.ino}:${stat.size}:${stat.mtimeMs}:${stat.ctimeMs}` : '';
}

/**
 * Find workspace manifests from the source file, not the process working directory.
 * @param {string} filename
 * @param {boolean} [refresh]
 * @returns {Record<string, string>}
 */
function getWorkspacePackages(filename, refresh = false) {
  let directory = path.dirname(filename);
  while (true) {
    const manifest = path.join(directory, 'package.json');
    if (workspaceCache?.root === directory && !refresh && workspaceCache.signature === signature(manifest)) {
      return workspaceCache.packages;
    }
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
        const signatures = new Map();
        for (const relativeManifest of manifests) {
          const relativeDirectory = path.dirname(relativeManifest).split(path.sep).join('/');
          if (excluded.some((/** @type {string} */ pattern) => minimatch(relativeDirectory, pattern.slice(1)))) {
            continue;
          }
          const workspaceManifest = path.join(directory, relativeManifest);
          const workspace = JSON.parse(fs.readFileSync(workspaceManifest, 'utf8'));
          signatures.set(workspaceManifest, signature(workspaceManifest));
          if (workspace.name) {
            if (packages[workspace.name] && packages[workspace.name] !== workspaceManifest) {
              throw new Error(`Duplicate workspace package '${workspace.name}' in ${directory}.`);
            }
            packages[workspace.name] = workspaceManifest;
          }
        }
        workspaceCache = { root: directory, signature: signature(manifest), packages, signatures };
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
   * @param {{externalFolders: string[]}} options
   */
  resolve(source, filename, options) {
    const packageName = source.match(/^(@[^/]+\/[^/]+|[^./@][^/:]*)(?:\/|$)/)?.[1];
    if (!packageName || isBuiltin(packageName)) {
      return { found: false };
    }
    let packages = getWorkspacePackages(filename);
    let manifest = packages[packageName];
    if (manifest && workspaceCache?.signatures.get(manifest) !== signature(manifest)) {
      packages = getWorkspacePackages(filename, true);
      manifest = packages[packageName];
    } else if (!manifest) {
      // Installed external packages stay on the existing resolver path. Do not cache unknown names:
      // a workspace can be added or renamed in a long-lived ESLint process.
      let directory = path.dirname(filename);
      while (true) {
        const installedManifest = path.join(directory, 'node_modules', packageName, 'package.json');
        if (
          fs.existsSync(installedManifest) &&
          !fs.realpathSync(installedManifest).startsWith(`${workspaceCache?.root}${path.sep}`)
        ) {
          return { found: false };
        }
        const parent = path.dirname(directory);
        if (parent === directory) {
          break;
        }
        directory = parent;
      }
      packages = getWorkspacePackages(filename, true);
      manifest = packages[packageName];
    }
    if (!manifest) {
      return { found: false };
    }
    if (!filename.startsWith(`${path.dirname(manifest)}${path.sep}`) && !options.externalFolders.includes(manifest)) {
      options.externalFolders.push(manifest);
    }
    return { found: true, path: manifest };
  },
};
