// @ts-check

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

/** @type {{ trivial: string[]; protected: string[] }} */
const rules = JSON.parse(readFileSync(join(__dirname, '../../../.github/risk-tiers.json'), 'utf8'));

/**
 * The single definition of each tier: its label, and the criteria shown to reviewers and to the model.
 * The index is the tier number.
 */
const tiers = [
  {
    label: 'Risk: trivial',
    criteria: 'Trivial: every changed file is an allowlisted story or package-local document.',
  },
  {
    label: 'Risk: low',
    criteria:
      'Low: tests or snapshots only, or a fix of at most 50 added plus deleted lines (tests included, Beachball ' +
      "change files excluded) in one package's source.",
  },
  {
    label: 'Risk: standard',
    criteria:
      'Standard: everything else, including anything that cannot be judged, and behavior or accessibility changes ' +
      'that need a normal review.',
  },
  {
    label: 'Risk: high',
    criteria:
      'High: a protected path (public API reports, manifests, CI, build and release tooling, core packages, agent ' +
      'instructions), a security or trust-boundary change (sanitizing, escaping or evaluating untrusted input, ' +
      'prototype pollution, credentials), or a breaking change to a public contract that no protected path shows.',
  },
];
const tierLabels = tiers.map(tier => tier.label);

const maxSmallFixLines = 50;
// GitHub lists at most 3,000 files for a pull request, so a list that long may be truncated.
const maxListedFiles = 3000;
const maxListedPaths = 5;
const maxShownPathLength = 120;
const changeFile = /^change\/[^/]+\.json$/;
// A package source root eligible for the small-fix rule: `library/src/` (v9 React and charts packages), and the
// web components package, which keeps its source in `src/`. Other `src/` folders belong to tooling, legacy v8 or
// core runtime packages, so a change there is at least standard.
const sourceRoot = /^(packages\/(?:[^/]+\/)+?library\/src\/|packages\/web-components\/src\/)/;

/**
 * Compiles a risk glob. Only literal segments, `*` (within a segment) and `**` (any number of segments) are
 * supported, and wildcards match dot-prefixed names, so a protected directory also covers its hidden files.
 * Anything else fails loudly instead of silently weakening a rule.
 *
 * @param {string} glob
 * @param {string} [flags]
 * @returns {RegExp}
 */
function compileGlob(glob, flags) {
  if (/[?[\]{}!\\]/.test(glob)) {
    throw new Error(`Unsupported syntax in risk glob "${glob}": use literal paths, * and **.`);
  }
  const source = glob
    .split('/')
    .map((segment, index, segments) => {
      const isLast = index === segments.length - 1;
      if (segment === '**') {
        // [\s\S], not `.`: git paths may contain newlines.
        return isLast ? '[\\s\\S]+' : '(?:[^/]+/)*';
      }
      const escaped = segment
        .split('*')
        .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('[^/]*');
      return isLast ? escaped : `${escaped}/`;
    })
    .join('');
  return new RegExp(`^${source}$`, flags);
}

const trivialPatterns = rules.trivial.map(glob => compileGlob(glob));
// Case-insensitive: agent tools and case-insensitive file systems treat `agents.md` like `AGENTS.md`.
const protectedPatterns = rules.protected.map(glob => compileGlob(glob, 'i'));

/** @typedef {{ filename: string; previous_filename?: string; additions: number; deletions: number; patch?: string }} ChangedFile */
/** @typedef {0 | 1 | 2 | 3} Tier */

/**
 * @param {string} path
 * @param {RegExp[]} patterns
 */
function matchesAny(path, patterns) {
  return patterns.some(pattern => pattern.test(path));
}

/** @param {ChangedFile} file The current path and, for a rename, the previous one. */
function pathsOf(file) {
  return file.previous_filename ? [file.filename, file.previous_filename] : [file.filename];
}

/** @param {string} path */
function isSnapshot(path) {
  return (
    path.endsWith('.snap') || (path.split('/').includes('__snapshots__') && /\.(?:png|jpe?g|gif|webp)$/.test(path))
  );
}

/** @param {string} path */
function isTestOrSnapshot(path) {
  return /\.(?:test|spec|cy)\.[cm]?[jt]sx?$/.test(path) || isSnapshot(path);
}

/**
 * A story or package-local document. Hidden files, configuration files and tests never qualify, even inside an
 * allowlisted folder.
 * @param {string} path
 */
function isTrivialPath(path) {
  const names = path.split('/');
  return (
    matchesAny(path, trivialPatterns) &&
    !names.some(name => name.startsWith('.')) &&
    !names[names.length - 1].includes('.config.') &&
    !isTestOrSnapshot(path)
  );
}

/** @param {ChangedFile} file */
function hasTextPatch(file) {
  return typeof file.patch === 'string' && file.patch.length > 0;
}

/** @param {string} path The package source root of a source or test file, if it has one. */
function sourceRootOf(path) {
  return isTrivialPath(path) ? undefined : sourceRoot.exec(path)?.[1];
}

/**
 * Shows a path from the PR in a code span. Paths are attacker-chosen, so control characters and backticks are
 * replaced and long paths are cut: the check summary must not render headings or links from a file name.
 * @param {string} path
 */
function showPath(path) {
  const safe = path.replace(/[\u0000-\u001f\u007f`]/g, '?');
  return `\`${safe.length > maxShownPathLength ? `${safe.slice(0, maxShownPathLength)}...` : safe}\``;
}

/** @param {string[]} paths */
function listPaths(paths) {
  const unique = [...new Set(paths)];
  const rest = unique.length - maxListedPaths;
  return unique.slice(0, maxListedPaths).map(showPath).join(', ') + (rest > 0 ? ` and ${rest} more` : '');
}

/**
 * @param {ChangedFile[]} files
 * @returns {string | undefined} Why the files are a small fix in one package, if they are.
 */
function smallFixReason(files) {
  const paths = files.flatMap(pathsOf);
  const roots = new Set(paths.map(sourceRootOf));
  const [root] = roots;
  if (roots.size !== 1 || !root) {
    return undefined;
  }
  const lines = files.reduce((total, file) => total + file.additions + file.deletions, 0);
  return lines <= maxSmallFixLines
    ? `${lines} changed lines (limit ${maxSmallFixLines}) in one package: ${showPath(root)}`
    : undefined;
}

/**
 * Assigns the deterministic risk tier of a pull request from its changed paths and line counts only. The title,
 * description and author are never read: they are the author's own words.
 *
 * Order: any listed protected path (either side of a rename) is tier 3; an incomplete file list is tier 2; a file
 * without a text diff (binary or too large), other than a snapshot, is tier 2; then tier 0, then tier 1; everything
 * else is tier 2.
 *
 * @param {ChangedFile[]} files The files GitHub lists for the pull request.
 * @param {{ changedFiles: number }} pull The number of changed files GitHub reports for the pull request.
 * @returns {{ tier: Tier; reason: string }}
 */
function classifyRisk(files, { changedFiles }) {
  for (const file of files) {
    if (
      !file.filename ||
      !Number.isSafeInteger(file.additions) ||
      !Number.isSafeInteger(file.deletions) ||
      file.additions < 0 ||
      file.deletions < 0
    ) {
      throw new Error('Invalid pull request file metadata.');
    }
  }
  const paths = files.flatMap(pathsOf);
  const protectedPaths = paths.filter(path => matchesAny(path, protectedPatterns));
  if (protectedPaths.length > 0) {
    return { tier: 3, reason: `Protected paths changed: ${listPaths(protectedPaths)}.` };
  }
  if (files.length === 0 || files.length !== changedFiles || files.length >= maxListedFiles) {
    return { tier: 2, reason: 'The changed-file list is empty or incomplete, so the change cannot be judged.' };
  }
  // Without a text diff, neither a reviewer skimming the fast lane nor the line count sees the change.
  const unseen = files.filter(file => !hasTextPatch(file) && !pathsOf(file).every(isSnapshot));
  if (unseen.length > 0) {
    return { tier: 2, reason: `No text diff for: ${listPaths(unseen.map(file => file.filename))}.` };
  }
  if (paths.every(isTrivialPath)) {
    return { tier: 0, reason: 'Every changed path is an allowlisted story or package-local document.' };
  }

  // Beachball change files accompany almost every fix, so they do not disqualify a low-risk change.
  const reviewed = files.filter(file => !pathsOf(file).every(path => changeFile.test(path)));
  const reviewedPaths = reviewed.flatMap(pathsOf);
  if (reviewed.length > 0 && reviewedPaths.every(path => path.startsWith('packages/') && isTestOrSnapshot(path))) {
    return { tier: 1, reason: 'Only tests or snapshots changed; a human must check for accepted regressions.' };
  }
  const smallFix = smallFixReason(reviewed);
  if (smallFix) {
    return { tier: 1, reason: `Small fix: ${smallFix}.` };
  }
  return { tier: 2, reason: 'No fast-lane rule matches the complete diff.' };
}

/**
 * A nonempty `Review focus: ...` line outside comments and code blocks. A list bullet and bold around the label or
 * the colon are accepted, so the common Markdown spellings count.
 * @param {string | null} body
 */
function hasReviewFocus(body) {
  const visibleBody = (body || '').replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  return /^[ \t]*(?:[-*+][ \t]+)?(?:\*\*)?Review focus(?:\*\*)?[ \t]*:(?:\*\*)?[ \t]*[^\s*].*$/im.test(visibleBody);
}

module.exports = { classifyRisk, hasReviewFocus, rules, tierLabels, tiers };
