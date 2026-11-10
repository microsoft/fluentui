// @ts-check

const micromatch = require('micromatch');

const defaultRules = require('./tier-rules');

const MATCH_OPTIONS = { dot: true };
const MAX_LISTED_PATHS = 5;

/**
 * @param {string} path
 * @param {string[]} patterns
 * @returns {boolean} Whether the path matches at least one pattern.
 */
function matchesAny(path, patterns) {
  return micromatch.isMatch(path, patterns, MATCH_OPTIONS);
}

/**
 * The paths a file occupies: its current path and, for a rename, the path it came from.
 * @param {import('./types').PullRequestFile} file
 * @returns {string[]}
 */
function pathsOf(file) {
  return file.previous_filename ? [file.filename, file.previous_filename] : [file.filename];
}

/**
 * @param {string[]} paths
 * @returns {string} The first few paths, with a count of the rest.
 */
function listPaths(paths) {
  const shown = paths.slice(0, MAX_LISTED_PATHS).join(', ');
  const rest = paths.length - MAX_LISTED_PATHS;
  return rest > 0 ? `${shown} and ${rest} more` : shown;
}

/**
 * @param {string} path
 * @param {import('./types').TierRules} rules
 * @returns {string | undefined} The package root directory of a path, if it is inside a package.
 */
function packageRootOf(path, rules) {
  for (const pattern of rules.packageRoots) {
    const match = pattern.exec(path);
    if (match) {
      return match[0];
    }
  }
  return undefined;
}

/**
 * @param {string} path
 * @param {import('./types').TierRules} rules
 * @returns {boolean} Whether a path is a story or package documentation file (tier 0 material).
 */
function isTierZeroPath(path, rules) {
  return matchesAny(path, rules.tier0.allow) && !matchesAny(path, rules.tier0.exclude);
}

/**
 * @param {import('./types').PullRequestFile[]} files
 * @param {import('./types').TierRules} rules
 * @returns {string | undefined} A reason if every file is a story or package documentation file.
 */
function checkTierZero(files, rules) {
  const allTrivial = files.every(file => pathsOf(file).every(path => isTierZeroPath(path, rules)));
  return allTrivial ? `all ${files.length} changed files are stories or package documentation` : undefined;
}

/**
 * @param {import('./types').PullRequestFile[]} files Files other than change files.
 * @param {number} changedLines
 * @param {import('./types').TierRules} rules
 * @returns {string | undefined} A reason if the change is low risk: tests only, or a small fix in one package.
 */
function checkTierOne(files, changedLines, rules) {
  if (files.length === 0) {
    return undefined;
  }

  if (files.every(file => pathsOf(file).every(path => matchesAny(path, rules.tests)))) {
    return 'only tests or snapshots changed';
  }

  const paths = files.flatMap(pathsOf);
  const roots = new Set(paths.map(path => packageRootOf(path, rules)));
  const inOnePackage = roots.size === 1 && !roots.has(undefined);
  const touchesSource = paths.some(path => matchesAny(path, rules.librarySource) && !matchesAny(path, rules.tests));

  if (inOnePackage && touchesSource && changedLines <= rules.maxSmallFixLines) {
    return `${changedLines} changed lines (limit ${rules.maxSmallFixLines}) in one package: ${[...roots][0]}`;
  }
  return undefined;
}

/**
 * Decides the risk tier of a pull request from its changed files.
 *
 * Order: tier 3 if any file (old or new path) is protected; otherwise tier 2 if the file list may be incomplete;
 * otherwise tier 0, then tier 1; anything else is tier 2. Only paths and line counts are read.
 *
 * @param {import('./types').ClassifyInput} input
 * @param {import('./types').TierRules} [rules]
 * @returns {import('./types').Classification}
 */
function classify(input, rules = defaultRules) {
  const { files, changedFiles } = input;
  const isChangeFile = (/** @type {import('./types').PullRequestFile} */ file) =>
    matchesAny(file.filename, rules.changeFiles);
  const otherFiles = files.filter(file => !isChangeFile(file));
  const changedLines = otherFiles.reduce((sum, file) => sum + file.additions + file.deletions, 0);

  /**
   * @param {import('./types').Tier} tier
   * @param {string} reason
   * @returns {import('./types').Classification}
   */
  const result = (tier, reason) => ({
    tier,
    reasons: [`tier ${tier}: ${reason}`],
    files: files.length,
    changedLines,
    ruleVersion: rules.version,
  });

  const protectedPaths = files.flatMap(pathsOf).filter(path => matchesAny(path, rules.tier3));
  if (protectedPaths.length > 0) {
    return result(3, `protected paths changed: ${listPaths([...new Set(protectedPaths)])}`);
  }

  if (files.length === 0) {
    return result(2, 'the file list is empty, so the change cannot be judged');
  }
  const incomplete =
    files.length >= rules.maxListedFiles || (changedFiles !== undefined && changedFiles !== files.length);
  if (incomplete) {
    return result(2, 'the file list may be incomplete, so the change cannot be judged');
  }

  const tierZero = checkTierZero(files, rules);
  if (tierZero) {
    return result(0, tierZero);
  }

  const tierOne = checkTierOne(otherFiles, changedLines, rules);
  if (tierOne) {
    return result(1, tierOne);
  }

  return result(2, 'no tier 0, 1 or 3 rule applies');
}

module.exports = { classify };
