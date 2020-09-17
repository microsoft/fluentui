import { customElement } from '@microsoft/fast-element';
import { TreeViewTemplate as template, TreeView } from '@microsoft/fast-foundation';
import { TreeViewStyles as styles } from './tree-view.styles';

/**
 * The Fluent Tree View Custom Element. Implements {@link @microsoft/fast-foundation#TreeView},
 * {@link @microsoft/fast-foundation#TreeView}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-view\>
 */
@customElement({
  name: 'fluent-tree-view',
  template,
  styles,
})
export class FluentTreeView extends TreeView {}

/**
 * Styles for TreeView
 * @public
 */
export const TreeViewStyles = styles;
