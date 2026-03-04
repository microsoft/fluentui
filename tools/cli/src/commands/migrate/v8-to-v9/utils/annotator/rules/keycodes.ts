import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

const KNOWN_KEYCODES: Record<string, string> = {
  enter: 'Enter',
  escape: 'Escape',
  tab: 'Tab',
  space: ' ',
  backspace: 'Backspace',
  del: 'Delete',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  f1: 'F1',
  f2: 'F2',
};

export function detectKeyCodes(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  const hasKeyCodesImport = sourceFile
    .getImportDeclarations()
    .some(
      decl =>
        decl.getModuleSpecifierValue() === '@fluentui/react' &&
        decl.getNamedImports().some(s => s.getName() === 'KeyCodes'),
    );
  if (!hasKeyCodesImport) return results;

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.PropertyAccessExpression) return;

    const children = node.getChildren();
    const left = children[0]?.getText() ?? '';
    const right = children[children.length - 1]?.getText() ?? '';

    if (left !== 'KeyCodes') return;

    const line = node.getStartLineNumber();
    const keyValue = KNOWN_KEYCODES[right];

    if (keyValue) {
      results.push({
        action: 'auto',
        codemod: 'keycodes',
        payload: `KeyCodes.${right} → '${keyValue}'`,
        note: 'rewrite event.which/keyCode → event.key',
        line,
      });
    } else {
      results.push({
        action: 'manual',
        codemod: 'keycodes',
        payload: `KeyCodes.${right} → unknown key code`,
        note: 'find KeyboardEvent.key equivalent manually',
        line,
      });
    }
  });

  return results;
}
