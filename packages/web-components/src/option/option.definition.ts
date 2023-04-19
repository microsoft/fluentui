import { FluentDesignSystem } from '../fluent-design-system.js';
import { ListboxOption } from './option.js';
import { template } from './option.template.js';
import { styles } from './option.styles.js';

/**
 * The Fluent Option Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-option\>
 */
export const definition = ListboxOption.compose({
  name: `${FluentDesignSystem.prefix}-option`,
  template,
  styles,
});
