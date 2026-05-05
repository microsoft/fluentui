import { tagName } from './link.options.js';
import { Link } from './link.js';
import { styles } from './link.styles.js';
import { template } from './link.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-link\>
 */
export const definition = Link.compose({
  name: tagName,
  template,
  styles,
});
