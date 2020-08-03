import { customElement } from '@microsoft/fast-element';
import { TreeViewTemplate as template, TreeView } from '@microsoft/fast-foundation';
import { TreeViewStyles as styles } from './tree-view.styles';

/**
 * The FAST Tree View Custom Element. Implements {@link @microsoft/fast-foundation#TreeView},
 * {@link @microsoft/fast-foundation#TreeView}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tree-view\>
 */
@customElement({
  name: 'fast-tree-view',
  template,
  styles,
})
export class FASTTreeView extends TreeView {}
