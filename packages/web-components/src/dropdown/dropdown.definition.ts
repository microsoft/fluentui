import { tagName } from './dropdown.options.js';
import { Dropdown } from './dropdown.js';
import { styles } from './dropdown.styles.js';
import { template } from './dropdown.template.js';

/**
 * The Fluent Dropdown Element.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-dropdown>`
 */
export const definition = Dropdown.compose({
  name: tagName,
  template,
  styles,
});
