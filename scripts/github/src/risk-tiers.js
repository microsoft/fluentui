// @ts-check

const { readFileSync } = require('node:fs');
const { matchesGlob, join } = require('node:path');
/** @type {Record<string, { 'changed-files': Record<string, string[]>[] }[]>} */
const rules = JSON.parse(readFileSync(join(__dirname, '../../../.github/risk-tiers.json'), 'utf8'));

const tierLabels = ['Risk: trivial', 'Risk: low', 'Risk: standard', 'Risk: high'];
const trivialGlobs = rules['Risk: trivial'][0]['changed-files'][0]['any-glob-to-all-files'];
const highGlobs = rules['Risk: high'][0]['changed-files'][0]['any-glob-to-any-file'];
const protectedPatterns = highGlobs.map(glob => {
  if (/[?[\]{}!\\]/.test(glob)) {
    throw new Error('Protected risk globs support only literal paths, * and **.');
  }
  const segments = glob.split('/');
  return new RegExp(
    '^' +
      segments
        .map((segment, index) => {
          if (segment === '**') {
            return index === segments.length - 1 ? '[\\s\\S]*' : '(?:[^/]+/)*';
          }
          return (
            segment
              .split('*')
              .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
              .join('[^/]*') + (index < segments.length - 1 ? '/' : '')
          );
        })
        .join('') +
      '$',
  );
});

/** @typedef {{ filename: string; previous_filename?: string; additions: number; deletions: number; patch?: string }} ChangedFile */

/** @param {string} path */
function isSnapshot(path) {
  return path.endsWith('.snap') || (path.split('/').includes('__snapshots__') && /\.(png|jpe?g|gif|webp)$/.test(path));
}

/** @param {string} path */
function isTest(path) {
  return /\.(test|spec)\.[cm]?[jt]sx?$/.test(path);
}

/**
 * @param {ChangedFile[]} files
 * @param {{ author: string; title: string }} pull
 */
function classifyRisk(files, pull) {
  if (!files.length) {
    throw new Error('Cannot classify an empty or incomplete pull request diff.');
  }
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
  const paths = files.flatMap(file => [file.filename, ...(file.previous_filename ? [file.previous_filename] : [])]);
  const matches = (/** @type {string} */ path, /** @type {string[]} */ globs) =>
    globs.some(glob => matchesGlob(path, glob));

  if (paths.some(path => protectedPatterns.some(pattern => pattern.test(path)))) {
    return { tier: 3, reason: 'Changes a protected path; owning-team human review is required.' };
  }
  if (pull.author === 'dependabot[bot]') {
    return { tier: 2, reason: 'Dependabot stays outside the fast lane; use the existing dependency review process.' };
  }
  if (paths.every(path => matches(path, trivialGlobs)) && paths.every(path => !isSnapshot(path) && !isTest(path))) {
    return { tier: 0, reason: 'Every changed path is an allowlisted story or package-local document.' };
  }
  if (paths.every(path => /^packages\//.test(path) && (isTest(path) || isSnapshot(path)))) {
    return { tier: 1, reason: 'Tests or snapshots only; a human must check for accepted regressions.' };
  }
  const sourceRoots = paths.map(path => /^(packages\/.+\/library\/src\/)/.exec(path)?.[1]);
  const changedLines = files.reduce((total, file) => total + file.additions + file.deletions, 0);
  if (
    /^fix(?:\([^)]+\))?:/i.test(pull.title) &&
    changedLines <= 50 &&
    files.every(file => typeof file.patch === 'string' && file.patch.length > 0) &&
    sourceRoots.every(root => root && root === sourceRoots[0])
  ) {
    return { tier: 1, reason: `Fix with ${changedLines} added/deleted lines in one package's library/src.` };
  }
  return { tier: 2, reason: 'Default review process; no fast-lane rule matches the complete diff.' };
}

/** @param {string | null} body */
function hasReviewFocus(body) {
  const visibleBody = (body || '').replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  return /^(?:\*\*)?Review focus:(?:\*\*)?[ \t]*\S[^\r\n]*$/im.test(visibleBody);
}

module.exports = { classifyRisk, hasReviewFocus, tierLabels };
