import { FluentDesignSystem } from '../fluent-design-system.js';
import { Select } from './select.js';
import { styles } from './select.styles.js';
import { template } from './select.template.js';

/**
 * The Fluent Select Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-select\>
 */
export const definition = Select.compose({
  name: `${FluentDesignSystem.prefix}-select`,
  template,
  styles,
});
