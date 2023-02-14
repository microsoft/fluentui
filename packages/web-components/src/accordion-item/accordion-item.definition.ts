import { FluentDesignSystem } from '../fluent-design-system.js';
import { AccordionItem } from './accordion-item.js';
import { styles } from './accordion-item.styles.js';
import { template } from './accordion-item.template.js';

/**
 * The Fluent AccordionItem Element. Implements {@link @microsoft/fast-foundation#AccordionItem },
 * {@link @microsoft/fast-foundation#accordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
export const definition = AccordionItem.compose({
  name: `${FluentDesignSystem.prefix}-accordion-item`,
  template,
  styles,
});
