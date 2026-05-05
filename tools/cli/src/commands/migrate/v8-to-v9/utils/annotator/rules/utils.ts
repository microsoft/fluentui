import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';

/**
 * Returns the set of names imported from @fluentui/react in a source file.
 * Used by rules to avoid false positives on custom components with the same name.
 */
export function getFluentImportNames(sourceFile: SourceFile): Set<string> {
  const names = new Set<string>();
  for (const decl of sourceFile.getImportDeclarations()) {
    if (decl.getModuleSpecifierValue() === '@fluentui/react') {
      for (const named of decl.getNamedImports()) {
        names.add(named.getAliasNode()?.getText() ?? named.getName());
      }
    }
  }
  return names;
}

/**
 * Returns true when a JsxOpeningElement or JsxSelfClosingElement is a direct
 * child of another JSX element (i.e. lives inside JSX children, not at the
 * root of an expression).  The writer uses this to emit block-comment syntax
 * instead of a line comment, since // inside JSX children is rendered as text.
 */
export function isJsxChild(node: Node): boolean {
  if (node.getKind() === SyntaxKind.JsxOpeningElement) {
    // JsxOpeningElement → parent JsxElement → grandparent must be another JsxElement
    return node.getParent()?.getParent()?.getKind() === SyntaxKind.JsxElement;
  }
  if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
    // JsxSelfClosingElement is a direct child — its parent is the containing JsxElement
    return node.getParent()?.getKind() === SyntaxKind.JsxElement;
  }
  return false;
}
