import { customElement } from '@microsoft/fast-element';
import { TreeItemTemplate as template, TreeItem } from '@microsoft/fast-foundation';
import { TreeItemStyles as styles } from './tree-item.styles';

/**
 * The FAST Tree Item Custom Element. Implements {@link @microsoft/fast-foundation#TreeItem},
 * {@link @microsoft/fast-foundation#TreeItem}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tree-item\>
 */
@customElement({
  name: 'fast-tree-item',
  template,
  styles,
})
export class FASTTreeItem extends TreeItem {}

/**
 * Styles for TreeItem
 * @public
 */
export const TreeItemStyles = styles;
