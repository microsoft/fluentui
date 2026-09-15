import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

const LABEL_COMPONENTS = new Set(['TextField', 'SpinButton', 'Slider', 'ChoiceGroup', 'Spinner', 'ProgressIndicator']);

/** Maps v8 component names to their v9 equivalents for use in scaffold payloads. */
const V9_NAME: Record<string, string> = {
  TextField: 'Input',
  ProgressIndicator: 'ProgressBar',
};

export function detectLabelExtraction(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || !LABEL_COMPONENTS.has(tagName)) {
      return;
    }

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      const line = attr.getStartLineNumber();

      switch (propName) {
        case 'label':
          results.push({
            action: 'scaffold',
            codemod: 'label-extraction',
            payload: `${tagName}.label → <Field label="..."><${V9_NAME[tagName] ?? tagName} /></Field>`,
            note: 'also move: required, errorMessage→validationMessage, description→hint',
            line,
          });
          break;
        case 'onRenderLabel':
          results.push({
            action: 'manual',
            codemod: 'label-extraction',
            payload: `${tagName}.onRenderLabel → custom label slot`,
            note: 'inspect render callback and convert to slot',
            line,
          });
          break;
      }
    }
  });

  return results;
}
