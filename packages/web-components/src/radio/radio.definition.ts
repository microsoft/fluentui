import { tagName } from './radio.options.js';
import { Radio } from './radio.js';
import { styles } from './radio.styles.js';
import { template } from './radio.template.js';

/**
 * The Fluent Radio Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio\>
 */
export const definition = Radio.compose({
  name: tagName,
  template,
  styles,
});
