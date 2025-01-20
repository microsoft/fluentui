import { FluentDesignSystem } from '../fluent-design-system.js';
import { Listbox } from './listbox.js';
import { styles } from './listbox.styles.js';
import { template } from './listbox.template.js';

/**
 * The Fluent Listbox Element
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-listbox>`
 */
export const definition = Listbox.compose({
  name: `${FluentDesignSystem.prefix}-listbox`,
  template,
  styles,
});
