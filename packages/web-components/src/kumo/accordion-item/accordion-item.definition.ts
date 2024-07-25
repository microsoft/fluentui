import { BaseAccordionItem } from '../../accordion-item/accordion-item.js';
import { styles } from './accordion-item.styles.js';
import { template } from './accordion-item.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
export const definition = BaseAccordionItem.compose({
  name: `kumo-accordion-item`,
  template,
  styles,
});
