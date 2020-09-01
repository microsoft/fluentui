import { customElement } from '@microsoft/fast-element';
import { TreeItemTemplate as template, TreeItem } from '@microsoft/fast-foundation';
import { TreeItemStyles as styles } from './tree-item.styles';

/**
 * The Fluent Tree Item Custom Element. Implements {@link @microsoft/fast-foundation#TreeItem},
 * {@link @microsoft/fast-foundation#TreeItem}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-item\>
 */
@customElement({
  name: 'fluent-tree-item',
  template,
  styles,
})
export class FluentTreeItem extends TreeItem {}

/**
 * Styles for TreeItem
 * @public
 */
export const TreeItemStyles = styles;
