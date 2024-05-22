import { FluentDesignSystem } from '../fluent-design-system.js';
import { Checkbox } from './checkbox.js';
import { template } from './checkbox.template.js';
import { styles } from './checkbox.styles.js';

/**
 * The Fluent Checkbox Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-checkbox\>
 */
export const definition = Checkbox.compose({
  name: `${FluentDesignSystem.prefix}-checkbox`,
  template,
  styles,
});
