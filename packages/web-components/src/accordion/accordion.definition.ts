import { FluentDesignSystem } from '../fluent-design-system.js';
import { Accordion } from './accordion.js';
import { styles } from './accordion.styles.js';
import { template } from './accordion.template.js';

/**
 * The Fluent Accordion Element. Implements {@link @microsoft/fast-foundation#Accordion },
 * {@link @microsoft/fast-foundation#accordionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
export const definition = Accordion.compose({
  name: `${FluentDesignSystem.prefix}-accordion`,
  template,
  styles,
});
