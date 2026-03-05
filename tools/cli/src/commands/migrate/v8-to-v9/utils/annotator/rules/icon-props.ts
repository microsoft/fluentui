import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

// Known icon names that have a direct @fluentui/react-icons equivalent.
// The v9 icon name is the v8 name + "Regular" suffix (e.g. Add → AddRegular).
const KNOWN_ICONS = new Set([
  // Navigation & actions
  'Add',
  'AddCircle',
  'ArrowClockwise',
  'ArrowCounterclockwise',
  'ArrowDown',
  'ArrowDownload',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowUpload',
  'Attach',
  'Backspace',
  'Bookmark',
  'BookmarkAdd',
  'Calendar',
  'CalendarAdd',
  'Call',
  'Camera',
  'Cancel',
  'CheckMark',
  'ChevronDown',
  'ChevronLeft',
  'ChevronRight',
  'ChevronUp',
  'CircleSmall',
  'ClipboardPaste',
  'Clock',
  'Close',
  'Cloud',
  'CloudArrowUp',
  'Code',
  'Color',
  'Comment',
  'CommentAdd',
  'Copy',
  'Cut',
  'DataBar',
  'Delete',
  'Dismiss',
  'Document',
  'DocumentAdd',
  'DocumentCopy',
  'DocumentEdit',
  'Download',
  'Edit',
  'Emoji',
  'Error',
  'Eye',
  'EyeOff',
  'Filter',
  'Flag',
  'Folder',
  'FolderAdd',
  'FolderOpen',
  'Globe',
  'Grid',
  'Group',
  'Heart',
  'Help',
  'Home',
  'Image',
  'Info',
  'Key',
  'Laugh',
  'Link',
  'List',
  'Location',
  'Lock',
  'LockClosed',
  'LockOpen',
  'Mail',
  'MailAdd',
  'MailRead',
  'Map',
  'Megaphone',
  'Mention',
  'Mic',
  'MicOff',
  'More',
  'MoreHorizontal',
  'MoreVertical',
  'Move',
  'Navigation',
  'Open',
  'Options',
  'Organization',
  'Pause',
  'People',
  'PeopleAdd',
  'Person',
  'PersonAdd',
  'Phone',
  'Pin',
  'Play',
  'Print',
  'Question',
  'Refresh',
  'Rename',
  'Reply',
  'ReplyAll',
  'Save',
  'Search',
  'Send',
  'Settings',
  'Share',
  'Shield',
  'SignOut',
  'Sparkle',
  'Star',
  'StarAdd',
  'Stop',
  'Subtract',
  'SubtractCircle',
  'Tag',
  'TaskList',
  'Text',
  'Thumblike',
  'ThumbDislike',
  'Timer',
  'Translate',
  'Unlock',
  'Upload',
  'User',
  'Video',
  'VideoOff',
  'Warning',
  'Wrench',
  'ZoomIn',
  'ZoomOut',
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
