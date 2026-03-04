import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { getFluentImportNames } from './utils';

export function detectToggleProps(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];
  const fluentNames = getFluentImportNames(sourceFile);

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || tagName !== 'Toggle') return;

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
            codemod: 'toggle-props',
            payload: `${propName} | v9 Switch has no on/off labels — remove or build custom wrapper`,
            line,
          });
          break;
      }
    }
  });

  return results;
}
