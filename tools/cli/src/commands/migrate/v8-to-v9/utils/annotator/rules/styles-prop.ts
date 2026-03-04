import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { getFluentImportNames } from './utils';

export function detectStylesProp(sourceFile: SourceFile): AnnotationResult[] {
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
      if (propName !== 'styles') continue;

      results.push({
        action: 'scaffold',
        codemod: 'styles-prop',
        payload: `${tagName}.styles → makeStyles skeleton`,
        note: 'translate values manually using tokens — see references/theme.md',
        line: attr.getStartLineNumber(),
      });
    }
  });

  return results;
}
