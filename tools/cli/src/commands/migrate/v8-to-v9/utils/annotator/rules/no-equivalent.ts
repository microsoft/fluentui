import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { isJsxChild } from './utils';

const DEPRECATED_COMPONENTS: Record<string, string> = {
  ActivityItem: 'build with Avatar + Text + makeStyles flexbox — see SKILL.md deprecation list',
  MarqueeSelection: 'use browser selection APIs or custom drag-select implementation',
  HoverCard: 'use <Popover> with onMouseEnter/onMouseLeave on the trigger',
  ResizeGroup: 'use Overflow component (<Overflow> + <OverflowItem>)',
  ScrollablePane: 'use overflow: auto on a CSS container + position: sticky for sticky headers',
  Announced: 'use a visually-hidden live region: <div role="status" aria-live="polite">',
  Stack: 'replace with makeStyles + flexbox layout — see references/stack.md',
  StackItem: 'replace with makeStyles + flexbox layout — see references/stack.md',
};

/** Exported so import-paths can suppress the auto annotation for deprecated-component imports. */
export const DEPRECATED_COMPONENT_NAMES = new Set(Object.keys(DEPRECATED_COMPONENTS));

export function detectNoEquivalent(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName) || !DEPRECATED_COMPONENTS[tagName]) {
      return;
    }

    results.push({
      action: 'no-equivalent',
      codemod: 'no-equivalent',
      payload: tagName,
      note: DEPRECATED_COMPONENTS[tagName],
      line: node.getStartLineNumber(),
      insideJsx: isJsxChild(node),
    });
  });

  return results;
}
