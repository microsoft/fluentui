import { tagName } from './divider.options.js';
import { Divider } from './divider.js';
import { template } from './divider.template.js';
import { styles } from './divider.styles.js';

/**
 * The Fluent Divider Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-divider\>
 */
export const definition = Divider.compose({
  name: tagName,
  template,
  styles,
});
