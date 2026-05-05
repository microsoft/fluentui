import { tagName } from './switch.options.js';
import { Switch } from './switch.js';
import { template } from './switch.template.js';
import { styles } from './switch.styles.js';

/**
 * The Fluent Switch Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-switch\>
 */
export const definition = Switch.compose({
  name: tagName,
  template,
  styles,
});
