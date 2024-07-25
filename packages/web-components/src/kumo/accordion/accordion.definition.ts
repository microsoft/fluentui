import { Accordion } from '../../accordion/accordion.js';
import { styles } from './accordion.styles.js';
import { template } from './accordion.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<kumo-accordion\>
 */
export const definition = Accordion.compose({
  name: `kumo-accordion`,
  template,
  styles,
});
