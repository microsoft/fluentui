import { FluentDesignSystem } from '../fluent-design-system.js';
import { Tree } from './tree.js';
import { styles as treeStyle } from './tree.styles.js';
import { template as treeTemplate } from './tree.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree\>
 */
export const definition = Tree.compose({
  name: `${FluentDesignSystem.prefix}-tree`,
  template: treeTemplate,
  styles: treeStyle,
});
