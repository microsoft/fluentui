import { FluentDesignSystem } from '../fluent-design-system.js';
import { Calendar } from './calendar.js';
import { styles } from './calendar.styles.js';
import { template } from './calendar.template.js';

/**
 * The Fluent Calendar Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-calendar\>
 */
export const definition = Calendar.compose({
  name: `${FluentDesignSystem.prefix}-calendar`,
  template,
  styles,
});
