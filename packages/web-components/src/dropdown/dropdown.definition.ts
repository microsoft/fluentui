import { FluentDesignSystem } from '../fluent-design-system.js';
import { Dropdown } from './dropdown.js';
import { template } from './dropdown.template.js';
import { styles } from './dropdown.styles.js';

/**
 * The Fluent Dropdown Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dropdown\>
 */
export const definition = Dropdown.compose({
  name: `${FluentDesignSystem.prefix}-dropdown`,
  template,
  styles,
});
