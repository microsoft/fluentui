import { FluentDesignSystem } from '../fluent-design-system.js';
import { DropdownOption } from './option.js';
import { styles } from './option.styles.js';
import { template } from './option.template.js';

/**
 * The Fluent Option Element.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-option>`
 */
export const definition = DropdownOption.compose({
  name: `${FluentDesignSystem.prefix}-option`,
  template,
  styles,
});
