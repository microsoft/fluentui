import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Names of v9 "base hooks": the implementation-only half of a `useFoo` / `useFooBase_unstable`
 * pair, kept free of focus/keyboard runtime so it can be composed by callers that may opt out
 * of those concerns. This is the structural marker used by both the signature rule and the
 * forbidden-runtime rule.
 */
export const BASE_HOOK_NAME_PATTERN = /^use[A-Z]\w*Base_unstable$/;

/**
 * Names of any `_unstable` hook, including base hooks themselves. The signature rule uses this
 * broader pattern in its selector and then dispatches by whether the name matches
 * `BASE_HOOK_NAME_PATTERN` (always checked) or is a wrapping state hook paired with a base hook
 * via {@link hasPairedBaseHook} (only checked when a pair exists).
 */
export const STATE_HOOK_NAME_PATTERN = /^use[A-Z]\w*_unstable$/;

export const BASE_SUFFIX = 'Base_unstable';
export const UNSTABLE_SUFFIX = '_unstable';
const SIBLING_EXTENSIONS: ReadonlyArray<string> = ['.ts', '.tsx'];

/**
 * Any function-literal form a base or paired state hook can take: top-level function declaration,
 * inline arrow function, or function expression bound to a variable / export. The signature rule
 * runs the same parameter validation against all three.
 */
export type BaseHookFunction =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;

/**
 * Collects names of top-level declarations matching `BASE_HOOK_NAME_PATTERN` into `out`.
 * Handles both `export const useFooBase_unstable = ...` (incl. `export const` chains) and
 * `export function useFooBase_unstable() {}`, plus the unexported / `export { ... }` forms.
 */
export function collectBaseHookNames(stmt: TSESTree.Node, out: Set<string>): void {
  // `export const useFooBase_unstable = ...` / `export function useFooBase_unstable() {}`
  if (stmt.type === AST_NODE_TYPES.ExportNamedDeclaration && stmt.declaration) {
    collectBaseHookNames(stmt.declaration, out);
    return;
  }
  // `function useFooBase_unstable() {}`
  if (stmt.type === AST_NODE_TYPES.FunctionDeclaration) {
    if (stmt.id && BASE_HOOK_NAME_PATTERN.test(stmt.id.name)) {
      out.add(stmt.id.name);
    }
    return;
  }
  // `const useFooBase_unstable = ...` (incl. multi-declarator forms)
  if (stmt.type === AST_NODE_TYPES.VariableDeclaration) {
    for (const decl of stmt.declarations) {
      if (decl.id.type === AST_NODE_TYPES.Identifier && BASE_HOOK_NAME_PATTERN.test(decl.id.name)) {
        out.add(decl.id.name);
      }
    }
  }
}

/**
 * Returns the function literal initializer of a `VariableDeclarator` when the declarator is a
 * plain Identifier bound to an inline arrow/function expression; otherwise `undefined`. Skips
 * destructuring patterns (no inspectable function literal) and non-function initializers
 * (call expressions, identifier aliases, missing initializer for ambients).
 */
export function getFunctionInit(node: TSESTree.VariableDeclarator): BaseHookFunction | undefined {
  if (node.id.type !== AST_NODE_TYPES.Identifier) {
    return undefined;
  }
  const init = node.init;
  if (
    !init ||
    (init.type !== AST_NODE_TYPES.ArrowFunctionExpression && init.type !== AST_NODE_TYPES.FunctionExpression)
  ) {
    return undefined;
  }
  return init;
}

/**
 * Stateful helper that decides whether a wrapping state hook (`useFoo_unstable`) is paired with
 * a sibling base hook (`useFooBase_unstable`) — either declared in the same file or as a sibling
 * `.ts` / `.tsx` file in the same directory. The base hook is the structural marker; when found,
 * the wrapping hook is required to honor the `(props, ref)` signature contract.
 *
 * Per-instance state:
 *  - `baseHooksInCurrentFile` is populated by the rule's `Program` visitor.
 *  - `siblingFileExistsCache` memoizes `fs.statSync` results so each component directory pays at
 *    most one syscall per linted run.
 *
 * Anchoring detection on the base hook eliminates false positives on other `_unstable` hooks
 * (e.g. `useFooContextValues_unstable`, `useFooStyles_unstable`) that intentionally take
 * different signatures.
 */
export function createPairDetector(filename: string | undefined) {
  const baseHooksInCurrentFile = new Set<string>();
  const siblingFileExistsCache = new Map<string, boolean>();

  function hasPairedBaseHook(stateHookName: string): boolean {
    const baseHookName = stateHookName.slice(0, -UNSTABLE_SUFFIX.length) + BASE_SUFFIX;
    if (baseHooksInCurrentFile.has(baseHookName)) {
      return true;
    }
    // ESLint passes synthetic filenames like `<input>` for inline code; nothing to check.
    if (!filename || !path.isAbsolute(filename)) {
      return false;
    }
    const dir = path.dirname(filename);
    // Sibling base-hook file (the wrapping hook lives in `useFoo.tsx`, the base in `useFooBase.tsx`).
    const siblingBasename = baseHookName.slice(0, -UNSTABLE_SUFFIX.length); // e.g. `useFooBase`
    for (const ext of SIBLING_EXTENSIONS) {
      const candidate = path.join(dir, siblingBasename + ext);
      if (candidate === filename) {
        continue;
      }
      let exists = siblingFileExistsCache.get(candidate);
      if (exists === undefined) {
        try {
          exists = fs.statSync(candidate).isFile();
        } catch {
          exists = false;
        }
        siblingFileExistsCache.set(candidate, exists);
      }
      if (exists) {
        return true;
      }
    }
    return false;
  }

  return {
    baseHooksInCurrentFile,
    hasPairedBaseHook,
  };
}
