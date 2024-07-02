import { FluentDesignSystem } from '../fluent-design-system.js';
import { TreeView } from './tree-view.js';
import { styles as treeViewStyle } from './tree-view.style.js';
import { template as treeViewTemplate } from './tree-view.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-view\>
 */
export const treeViewDefinition = TreeView.compose({
  name: `${FluentDesignSystem.prefix}-tree-view`,
  template: treeViewTemplate,
  styles: treeViewStyle,
});
