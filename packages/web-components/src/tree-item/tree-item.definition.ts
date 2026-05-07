import { tagName } from './tree-item.options.js';
import { TreeItem } from './tree-item.js';
import { styles as treeItemStyle } from './tree-item.styles.js';
import { template as treeItemTemplate } from './tree-item.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-item\>
 */
export const definition = TreeItem.compose({
  name: tagName,
  template: treeItemTemplate,
  styles: treeItemStyle,
});
