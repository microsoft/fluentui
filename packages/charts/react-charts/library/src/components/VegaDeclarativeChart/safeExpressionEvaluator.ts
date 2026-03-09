/**
 * Safe expression evaluator for Vega-Lite expressions.
 *
 * Validates expressions against an allowlist before evaluation to prevent
 * XSS / arbitrary code execution via `new Function()`.
 *
 * Allowed: `datum` property access, comparisons, arithmetic, logical ops,
 * ternary, literals, and parenthesized grouping.
 *
 * Blocked: global access, prototype traversal, assignments, and dangerous syntax.
 */

const ALLOWED_IDENTS = /^(datum|true|false|null|undefined|NaN|Infinity)$/;
const DANGEROUS_PROPS = /\b(constructor|__proto__|prototype)\b/;
const DANGEROUS_SYNTAX = /[`{}\\;]/;
const ASSIGNMENT = /(?<![!=<>])=(?!=)/;
const SINGLE_QUOTED_STRING = /'[^'\\]*(?:\\.[^'\\]*)*'/g;
const DOUBLE_QUOTED_STRING = /"[^"\\]*(?:\\.[^"\\]*)*"/g;
const STANDALONE_IDENT = /(?<!\.)\b([a-zA-Z_$]\w*)\b/g;

/**
 * Validates that a Vega-Lite expression only contains safe operations.
 * Throws if the expression could lead to code injection.
 */
function validateExpression(expr: string): void {
  if (!expr.trim()) {
    throw new Error('Empty expression');
  }

  // Strip string literals to avoid false positives on identifier checks
  const stripped = expr.replace(SINGLE_QUOTED_STRING, '""').replace(DOUBLE_QUOTED_STRING, '""');

  if (DANGEROUS_SYNTAX.test(stripped)) {
    throw new Error('Unsafe expression: disallowed syntax');
  }
  if (ASSIGNMENT.test(stripped)) {
    throw new Error('Unsafe expression: assignment not allowed');
  }
  if (DANGEROUS_PROPS.test(stripped)) {
    throw new Error('Unsafe expression: disallowed property access');
  }

  // Check all standalone identifiers (not preceded by a dot)
  STANDALONE_IDENT.lastIndex = 0;
  const identifiers = stripped.match(STANDALONE_IDENT) || [];
  for (const id of identifiers) {
    if (!ALLOWED_IDENTS.test(id)) {
      throw new Error(`Unsafe expression: disallowed identifier '${id}'`);
    }
  }
}

/**
 * Safely evaluates a Vega-Lite expression string against a `datum` object.
 * Validates the expression against an allowlist before evaluation.
 *
 * @param expr - Vega-Lite expression string (e.g. `"datum.y > 30"`)
 * @param datum - The data row to evaluate against
 * @returns The result of the expression evaluation
 * @throws If the expression contains disallowed syntax
 */
export function safeEvaluateExpression(expr: string, datum: Record<string, unknown>): unknown {
  validateExpression(expr);
  // eslint-disable-next-line no-new-func
  return new Function('datum', `'use strict'; return (${expr})`)(datum);
}
