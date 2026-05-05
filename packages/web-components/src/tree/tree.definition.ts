import { tagName } from './tree.options.js';
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
  name: tagName,
  template: treeTemplate,
  styles: treeStyle,
});
