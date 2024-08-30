import { FluentDesignSystem } from '../fluent-design-system.js';
import { DropdownList } from './dropdown-list.js';
import { styles } from './dropdown-list.styles.js';
import { template } from './dropdown-list.template.js';

/**
 * The Fluent DropdownList Element.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-dropdown-list>`
 */
export const definition = DropdownList.compose({
  name: `${FluentDesignSystem.prefix}-dropdown-list`,
  template,
  styles,
});
