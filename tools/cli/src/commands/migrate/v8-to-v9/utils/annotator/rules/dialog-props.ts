import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { getFluentImportNames } from './utils';

const DIALOG_COMPONENTS = new Set(['Dialog', 'Modal']);

export function detectDialogProps(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];
  const fluentNames = getFluentImportNames(sourceFile);

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || !DIALOG_COMPONENTS.has(tagName)) return;

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      const line = attr.getStartLineNumber();

      switch (propName) {
        case 'hidden':
          results.push({ action: 'auto', codemod: 'dialog-props', payload: 'hidden={expr} → open={!expr}', line });
          break;
        case 'isOpen':
          results.push({ action: 'auto', codemod: 'dialog-props', payload: 'isOpen → open', line });
          break;
        case 'onDismiss':
          results.push({
            action: 'auto',
            codemod: 'dialog-props',
            payload: 'onDismiss → onOpenChange',
            note: 'signature: (_, { open }) => { if (!open) ... }',
            line,
          });
          break;
        case 'isBlocking':
          results.push({
            action: 'auto',
            codemod: 'dialog-props',
            payload: 'isBlocking=true → modalType="alert"',
            line,
          });
          break;
        case 'dialogContentProps':
          results.push({
            action: 'scaffold',
            codemod: 'dialog-props',
            payload: 'dialogContentProps → DialogTitle + DialogBody structure',
            note: 'see references/dialog.md',
            line,
          });
          break;
      }
    }
  });

  return results;
}
