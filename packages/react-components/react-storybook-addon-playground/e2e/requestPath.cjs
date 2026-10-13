// @ts-check
'use strict';

const path = require('node:path');

/**
 * Maps a request URL to a file inside `shellDir` or `siteDir`. Returns `undefined` for malformed URLs and for paths
 * that escape their root (including sibling directories that share the root as a name prefix).
 *
 * @param {string} url - the request URL
 * @param {{ shellDir: string; siteDir: string }} roots - directories served under `/playground/app/` and `/`
 * @returns {string | undefined}
 */
function resolveRequestPath(url, roots) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  } catch {
    return undefined;
  }
  if (pathname.includes('\0')) {
    return undefined;
  }

  const [root, relative] = pathname.startsWith('/playground/app/')
    ? [roots.shellDir, pathname.slice('/playground/app/'.length)]
    : [roots.siteDir, pathname.slice(1)];
  const resolvedRoot = path.resolve(root);
  const filePath = path.resolve(resolvedRoot, relative);
  const fromRoot = path.relative(resolvedRoot, filePath);

  return fromRoot && !fromRoot.startsWith('..') && !path.isAbsolute(fromRoot) ? filePath : undefined;
}

module.exports = { resolveRequestPath };
