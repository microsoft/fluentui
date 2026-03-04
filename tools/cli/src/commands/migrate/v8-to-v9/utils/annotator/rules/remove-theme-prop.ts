import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { getFluentImportNames } from './utils';

export function detectRemoveThemeProp(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];
  const fluentNames = getFluentImportNames(sourceFile);

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName)) return;

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      if (propName !== 'theme') continue;

      // Non-trivial: value is an expression that isn't a bare identifier
      const initializer = attr.getInitializer();
      const isNonTrivial =
        initializer?.getKind() === SyntaxKind.JsxExpression &&
        initializer.getFirstChildByKind(SyntaxKind.Identifier) === undefined;

      results.push({
        action: 'auto',
        codemod: 'remove-theme-prop',
        payload: 'theme prop removed — handled by FluentProvider',
        note: isNonTrivial ? 'warn: nested FluentProvider may be needed' : undefined,
        line: attr.getStartLineNumber(),
      });
    }
  });

  return results;
}
