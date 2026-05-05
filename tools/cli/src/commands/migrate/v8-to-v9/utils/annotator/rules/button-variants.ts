import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { isJsxChild } from './utils';

const BUTTON_VARIANTS: Record<string, string> = {
  PrimaryButton: 'Button appearance="primary"',
  DefaultButton: 'Button',
  ActionButton: 'Button appearance="transparent"',
  IconButton: 'Button (icon-only)',
  CompoundButton: 'CompoundButton',
};

export function detectButtonVariants(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || !BUTTON_VARIANTS[tagName]) {
      return;
    }

    const line = node.getStartLineNumber();
    const insideJsx = isJsxChild(node);

    if (tagName === 'IconButton') {
      results.push({
        action: 'auto',
        codemod: 'button-variants',
        payload: 'IconButton → Button (icon-only)',
        note: 'add aria-label if missing',
        line,
        insideJsx,
      });
    } else if (tagName === 'CompoundButton') {
      results.push({
        action: 'auto',
        codemod: 'button-variants',
        payload: 'CompoundButton.secondaryText → secondaryContent',
        line,
        insideJsx,
      });
    } else {
      results.push({
        action: 'auto',
        codemod: 'button-variants',
        payload: `${tagName} → ${BUTTON_VARIANTS[tagName]}`,
        line,
        insideJsx,
      });
    }
  });

  return results;
}
