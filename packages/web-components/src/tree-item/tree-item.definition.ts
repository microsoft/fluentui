import { FluentDesignSystem } from '../fluent-design-system.js';
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
  name: `${FluentDesignSystem.prefix}-tree-item`,
  template: treeItemTemplate,
  styles: treeItemStyle,
});
