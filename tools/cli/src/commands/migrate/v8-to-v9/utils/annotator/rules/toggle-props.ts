import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

export function detectToggleProps(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || tagName !== 'Toggle') {
      return;
    }

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      const line = attr.getStartLineNumber();

      switch (propName) {
        case 'inlineLabel':
          results.push({
            action: 'auto',
            codemod: 'toggle-props',
            payload: 'inlineLabel → labelPosition="before"',
            line,
          });
          break;
        case 'onChange':
          results.push({
            action: 'auto',
            codemod: 'toggle-props',
            payload: 'onChange signature | (_, checked) → (_, { checked })',
            line,
          });
          break;
        case 'onText':
        case 'offText':
          results.push({
            action: 'no-equivalent',
            codemod: 'no-equivalent',
            payload: propName,
            note: 'v9 Switch has no on/off labels — remove the prop or build a custom wrapper',
            line,
          });
          break;
      }
    }
  });

  return results;
}
