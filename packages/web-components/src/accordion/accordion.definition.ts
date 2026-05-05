import { tagName } from './accordion.options.js';
import { Accordion } from './accordion.js';
import { styles } from './accordion.styles.js';
import { template } from './accordion.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
export const definition = Accordion.compose({
  name: tagName,
  template,
  styles,
});
