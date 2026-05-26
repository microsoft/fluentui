import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * The original (imported) name of an import specifier, used for diagnostics and for matching
 * against a forbidden/watched package's exports.
 *
 *  - named import         (`import { Foo }`)        → `'Foo'`
 *  - aliased named import (`import { Foo as Bar }`) → `'Foo'` (the original, not the alias)
 *  - default import       (`import X from 'pkg'`)   → `'default'`
 *  - namespace import     (`import * as X`)         → `'*'`
 */
export type ImportSpecifierNode =
  | TSESTree.ImportSpecifier
  | TSESTree.ImportDefaultSpecifier
  | TSESTree.ImportNamespaceSpecifier;

export function getImportedName(specifier: ImportSpecifierNode): string | undefined {
  switch (specifier.type) {
    case AST_NODE_TYPES.ImportSpecifier:
      return specifier.imported.type === AST_NODE_TYPES.Identifier
        ? specifier.imported.name
        : String(specifier.imported.value);
    case AST_NODE_TYPES.ImportDefaultSpecifier:
      return 'default';
    case AST_NODE_TYPES.ImportNamespaceSpecifier:
      return '*';
    default:
      return undefined;
  }
}

/**
 * A locally-declared binding originating from a tracked import (a watched or forbidden-runtime
 * package). Built by the runtime rule when walking `ImportDeclaration` nodes so body references
 * can be matched in O(1) via a `Map<Variable, TrackedImport>`.
 */
export interface TrackedImport {
  /** The package the binding came from (a watched OR forbidden-runtime package). */
  package: string;
  /** Original imported name (not the local alias). `default` or `*` for default / namespace. */
  importedName: string;
  /** Kind of package — controls how the reference is checked. */
  kind: 'watched' | 'forbidden';
  /**
   * `true` when the binding is type-only (either the declaration is `import type ...`
   * or the specifier is `import { type Foo }`). Used to gate whether direct usage in a
   * value position is even possible (type-only bindings only surface in type positions).
   */
  isTypeOnly: boolean;
  /** The specifier node (used for symbol lookup via ParserServices). */
  specifier: ImportSpecifierNode;
}
