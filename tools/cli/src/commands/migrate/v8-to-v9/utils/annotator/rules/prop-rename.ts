import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

const PROP_RENAMES: Record<string, string> = {
  ariaLabel: 'aria-label',
  ariaHidden: 'aria-hidden',
  ariaDescribedBy: 'aria-describedby',
  ariaLabelledBy: 'aria-labelledby',
  ariaPositionInSet: 'aria-posinset',
  ariaSetSize: 'aria-setsize',
  componentRef: 'ref',
};

export function detectPropRenames(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName)) {
      return;
    }

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      if (PROP_RENAMES[propName]) {
        results.push({
          action: 'auto',
          codemod: 'prop-rename',
          payload: `${propName} → ${PROP_RENAMES[propName]}`,
          line: attr.getStartLineNumber(),
        });
      }
    }
  });

  return results;
}
