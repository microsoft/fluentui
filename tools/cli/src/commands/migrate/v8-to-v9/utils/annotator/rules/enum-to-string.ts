import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

const KNOWN_ENUM_MEMBERS: Record<string, Record<string, string>> = {
  MessageBarType: {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
    blocked: 'blocked',
    severeWarning: 'warning',
  },
  SpinnerSize: {
    xSmall: 'extra-small',
    small: 'small',
    medium: 'medium',
    large: 'large',
  },
  DialogType: {
    normal: 'normal',
    largeHeader: 'normal',
    close: 'normal',
  },
  CheckboxVisibility: {
    onHover: 'onHover',
    always: 'always',
    hidden: 'hidden',
  },
};

export function detectEnumToString(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.PropertyAccessExpression) {
      return;
    }

    const children = node.getChildren();
    const left = children[0]?.getText() ?? '';
    const right = children[children.length - 1]?.getText() ?? '';

    if (!KNOWN_ENUM_MEMBERS[left]) {
      return;
    }

    const stringValue = KNOWN_ENUM_MEMBERS[left][right];
    const line = node.getStartLineNumber();

    if (stringValue) {
      results.push({
        action: 'auto',
        codemod: 'enum-to-string',
        payload: `${left}.${right} → "${stringValue}"`,
        line,
      });
    } else {
      results.push({
        action: 'manual',
        codemod: 'enum-to-string',
        payload: `${left}.${right} → unknown member`,
        note: 'find string equivalent manually',
        line,
      });
    }
  });

  return results;
}
