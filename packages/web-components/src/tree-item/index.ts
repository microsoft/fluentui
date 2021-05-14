import { treeItemTemplate as template, TreeItem } from '@microsoft/fast-foundation';
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
export const fluentTreeItem = TreeItem.compose({
  baseName: 'tree-item',
  template,
  styles,
});

/**
 * Styles for TreeItem
 * @public
 */
export const treeItemStyles = styles;
