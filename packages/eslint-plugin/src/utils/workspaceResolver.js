// @ts-check
const fs = require('node:fs');
const path = require('node:path');
const minimatch = require('minimatch');
/** @type {(pattern: string) => string[]} */
// @ts-expect-error -- minimatch 3's public braceExpand is missing from @types/minimatch.
const braceExpand = minimatch.braceExpand;
const { isBuiltin } = require('node:module');

/** @type {{root: string, packages: Record<string, string>, signatures: Map<string, string>} | undefined} */
let workspaceCache;
/** @type {WeakMap<object, Record<string, string>>} */
const filePackages = new WeakMap();

/** @param {string} filename */
function signature(filename) {
  const stat = fs.statSync(filename, { throwIfNoEntry: false });
  return stat ? `${stat.ino}:${stat.size}:${stat.mtimeMs}:${stat.ctimeMs}` : '';
}

/**
 * Find workspace manifests from the source file, not the process working directory.
 * @param {string} filename
 * @returns {Record<string, string>}
 */
function getWorkspacePackages(filename) {
  let directory = path.dirname(filename);
  while (true) {
    const manifest = path.join(directory, 'package.json');
    if (
      workspaceCache?.root === directory &&
      [...workspaceCache.signatures].every(([input, previous]) => signature(input) === previous)
    ) {
      return workspaceCache.packages;
    }
    if (fs.existsSync(manifest)) {
      const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      const patterns = Array.isArray(pkg.workspaces) ? pkg.workspaces : pkg.workspaces?.packages;
      if (patterns) {
        const excluded = patterns.filter((/** @type {string} */ pattern) => pattern.startsWith('!'));
        /** @type {string[]} */
        const included = patterns.filter((/** @type {string} */ pattern) => !pattern.startsWith('!'));
        // Include intermediate and empty candidate directories to detect newly added workspaces.
        const discoveryPatterns = included.flatMap(pattern =>
          braceExpand(pattern).flatMap(expanded => {
            const segments = expanded.split('/');
            return segments.map((_, index) => segments.slice(0, index + 1).join('/'));
          }),
        );
        const entries = fs.globSync(
          [...new Set([...discoveryPatterns, ...included.map(pattern => `${pattern}/package.json`)])],
          { cwd: directory, withFileTypes: true },
        );
        /** @type {Record<string, string>} */
        const packages = Object.create(null);
        const signatures = new Map([
          [manifest, signature(manifest)],
          [directory, signature(directory)],
        ]);
        for (const entry of entries) {
          const workspaceManifest = path.join(entry.parentPath, entry.name);
          const relativeManifest = path.relative(directory, workspaceManifest).split(path.sep).join('/');
          const isManifest =
            !entry.isDirectory() && included.some(pattern => minimatch(relativeManifest, `${pattern}/package.json`));
          if (entry.isDirectory() || entry.isSymbolicLink() || isManifest) {
            signatures.set(workspaceManifest, signature(workspaceManifest));
          }
          if (!isManifest) {
            continue;
          }
          const relativeDirectory = path.posix.dirname(relativeManifest);
          if (excluded.some((/** @type {string} */ pattern) => minimatch(relativeDirectory, pattern.slice(1)))) {
            continue;
          }
          const workspace = JSON.parse(fs.readFileSync(workspaceManifest, 'utf8'));
          if (workspace.name) {
            if (packages[workspace.name] && packages[workspace.name] !== workspaceManifest) {
              throw new Error(`Duplicate workspace package '${workspace.name}' in ${directory}.`);
            }
            packages[workspace.name] = workspaceManifest;
          }
        }
        workspaceCache = { root: directory, packages, signatures };
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
    let packages = filePackages.get(options);
    if (!packages) {
      packages = getWorkspacePackages(filename);
      filePackages.set(options, packages);
    }
    const manifest = packages[packageName];
    if (!manifest) {
      return { found: false };
    }
    if (!filename.startsWith(`${path.dirname(manifest)}${path.sep}`) && !options.externalFolders.includes(manifest)) {
      options.externalFolders.push(manifest);
    }
    return { found: true, path: manifest };
  },
};
