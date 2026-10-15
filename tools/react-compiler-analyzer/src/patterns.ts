/**
 * Shared regex patterns for detecting React Compiler directives.
 *
 * Two levels of matching:
 * - Content-level: fast pre-filter to check if a file contains any directive
 * - Line-level: strict per-line parser that validates the directive is a standalone statement
 */

// ── Content-level patterns (for file scanning / pre-filtering) ──

/** Does the file contain a 'use no memo' directive? */
export const USE_NO_MEMO_CONTENT_RE = /['"]use no memo['"]/;

/** Does the file contain a 'use memo' directive? */
export const USE_MEMO_CONTENT_RE = /['"]use memo['"]/;

// ── Line-level patterns (for exact directive location parsing) ──

/** Matches a standalone 'use no memo' directive line (single or double quotes, optional parens/semicolons) */
export const USE_NO_MEMO_LINE_RE = /^\s*(?:\(?['"]use no memo['"]\)?;?\s*)(\/\/.*)?$/;

/** Matches a standalone 'use memo' directive line (single or double quotes, optional parens/semicolons) */
export const USE_MEMO_LINE_RE = /^\s*(?:\(?['"]use memo['"]\)?;?\s*)(\/\/.*)?$/;
