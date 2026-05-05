import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

export function detectProgressBarProps(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || tagName !== 'ProgressIndicator') {
      return;
    }

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      const line = attr.getStartLineNumber();

      switch (propName) {
        case 'percentComplete':
          results.push({ action: 'auto', codemod: 'progress-bar-props', payload: 'percentComplete → value', line });
          break;
        case 'label':
          results.push({
            action: 'auto',
            codemod: 'progress-bar-props',
            payload: 'label → Field wrapper',
            note: 'see label-extraction',
            line,
          });
          break;
      }
    }
  });

  return results;
}
