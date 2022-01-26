import { treeItemTemplate as template, TreeItem, TreeItemOptions } from '@microsoft/fast-foundation';
import { treeItemStyles as styles } from './tree-item.styles';

/**
 * The Fluent tree item Custom Element. Implements, {@link @microsoft/fast-foundation#TreeItem}
 * {@link @microsoft/fast-foundation#treeItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-item\>
 *
 */
export const fluentTreeItem = TreeItem.compose<TreeItemOptions>({
  baseName: 'tree-item',
  template,
  styles,
  expandCollapseGlyph: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"/>
    </svg>
  `,
});

/**
 * Styles for TreeItem
 * @public
 */
export const treeItemStyles = styles;

/**
 * Tree item base class
 * @public
 */
export { TreeItem };
