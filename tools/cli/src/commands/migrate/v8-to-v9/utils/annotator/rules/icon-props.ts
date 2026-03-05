import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

// Known icon names that have a direct @fluentui/react-icons equivalent (subset)
const KNOWN_ICONS = new Set([
  'Add',
  'Delete',
  'Edit',
  'Search',
  'Settings',
  'Filter',
  'Download',
  'Upload',
  'Share',
  'Copy',
  'Cancel',
  'CheckMark',
  'ChevronDown',
  'ChevronUp',
  'ChevronLeft',
  'ChevronRight',
  'More',
  'Save',
  'Info',
  'Warning',
  'Error',
  'Mail',
  'Phone',
  'Calendar',
  'Home',
  'Folder',
  'FolderOpen',
  'Tag',
  'Globe',
  'Lock',
  'Unlock',
  'User',
  'Group',
  'Refresh',
  'Close',
]);

export function detectIconProps(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName)) {
      return;
    }

    for (const attr of node.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
      const propName = attr.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
      if (propName !== 'iconProps') {
        continue;
      }

      const line = attr.getStartLineNumber();

      // Try to extract iconName value
      const iconNameLiteral = attr.getDescendantsOfKind(SyntaxKind.StringLiteral).find(s => {
        const parent = s.getParent();
        const grandparent = parent?.getParent();
        return grandparent?.getKind() === SyntaxKind.ObjectLiteralExpression;
      });

      const iconName = iconNameLiteral?.getLiteralValue();

      if (iconName && KNOWN_ICONS.has(iconName)) {
        results.push({
          action: 'auto',
          codemod: 'icon-props',
          payload: `iconProps.iconName="${iconName}" → icon={<${iconName}Regular />}`,
          note: `add import from @fluentui/react-icons`,
          line,
        });
      } else if (iconName) {
        results.push({
          action: 'manual',
          codemod: 'icon-props',
          payload: `iconProps.iconName="${iconName}" → unknown icon name`,
          note: 'find SVG in @fluentui/react-icons or replace with custom — see references/icons.md',
          line,
        });
      } else {
        results.push({
          action: 'manual',
          codemod: 'icon-props',
          payload: 'iconProps → dynamic icon name — cannot resolve statically',
          note: 'see references/icons.md',
          line,
        });
      }
    }
  });

  return results;
}
