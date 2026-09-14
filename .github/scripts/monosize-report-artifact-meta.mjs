// @ts-check

/**
 * Sets the monosize bundle-size report artifact metadata (name + path) as GitHub
 * Actions step outputs (`name`, `path`) via `core.setOutput`.
 *
 * `monosize.config.mjs` is the single source of truth: `monosize-storage-git` reads
 * the base report from the workflow artifact whose name matches `reportArtifactName`,
 * but it does not control the `actions/upload-artifact` step. Resolving the values
 * from the config here guarantees the uploaded artifact name/path can never drift
 * from what the storage adapter expects when reading the base report.
 *
 * Invoked via `actions/github-script` using a dynamic import (the inline `script`
 * runs as an async function body, so ESM modules are loaded with `await import`):
 *   const moduleUrl = pathToFileURL(path.resolve('.github/scripts/monosize-report-artifact-meta.mjs')).href;
 *   const { default: run } = await import(moduleUrl);
 *   run({ core });
 */

import { reportArtifactName, reportOutputPath } from '../../monosize.config.mjs';

// Strict allowlists — a report artifact name/path should only ever contain these
// characters. Fail closed on anything else so a malformed config surfaces loudly
// instead of producing a broken/empty artifact name that silently breaks the read side.
const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;
const PATH_PATTERN = /^[A-Za-z0-9._/-]+$/;

/**
 * @param {unknown} value
 * @param {RegExp} pattern
 * @param {string} label
 * @returns {string}
 */
function assertSafe(value, pattern, label) {
  if (typeof value !== 'string' || value.length === 0 || !pattern.test(value)) {
    throw new Error(
      `monosize report metadata: "${label}" is missing or contains unsupported characters ` +
        `(allowed: ${pattern.source}).`,
    );
  }
  return value;
}

/**
 * @param {Pick<import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams, 'core'>} options
 */
export default function main(options) {
  const { core } = options;

  core.setOutput('name', assertSafe(reportArtifactName, NAME_PATTERN, 'reportArtifactName'));
  core.setOutput('path', assertSafe(reportOutputPath, PATH_PATTERN, 'reportOutputPath'));
}
