import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { getFluentImportNames, isJsxChild } from './utils';

/** 1→1 renames that are safe to apply automatically. */
const AUTO_RENAMES: Record<string, string> = {
  Separator: 'Divider',
  Toggle: 'Switch',
  Shimmer: 'Skeleton',
  Fabric: 'FluentProvider',
  Layer: 'Portal',
  Overlay: 'Portal',
  ProgressIndicator: 'ProgressBar',
  SwatchColorPicker: 'SwatchPicker',
  CommandButton: 'MenuButton',
};

/** 1→many — the agent must decide based on context. */
const MANUAL_RENAMES: Record<string, { choices: string; ref: string }> = {
  GroupedList: {
    choices: 'Tree (expand/collapse), DataGrid (tabular), List (flat)',
    ref: 'references/tree.md',
  },
  DetailsList: {
    choices: 'DataGrid (selection/sort), Table (read-only)',
    ref: 'references/datagrid.md',
  },
  Popup: {
    choices: 'Popover (non-modal overlay), Dialog (modal/blocking)',
    ref: '',
  },
};

export function detectComponentRenames(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];
  const fluentNames = getFluentImportNames(sourceFile);

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName)) return;

    const insideJsx = isJsxChild(node);

    if (AUTO_RENAMES[tagName]) {
      results.push({
        action: 'auto',
        codemod: 'component-rename',
        payload: `${tagName} → ${AUTO_RENAMES[tagName]}`,
        line: node.getStartLineNumber(),
        insideJsx,
      });
    } else if (MANUAL_RENAMES[tagName]) {
      const { choices, ref } = MANUAL_RENAMES[tagName];
      results.push({
        action: 'manual',
        codemod: 'component-rename',
        payload: `${tagName} → ?`,
        note: `choices: ${choices}${ref ? ` — see ${ref}` : ''}`,
        line: node.getStartLineNumber(),
        insideJsx,
      });
    }
  });

  return results;
}
