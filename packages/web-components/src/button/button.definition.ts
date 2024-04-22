import { FluentDesignSystem } from '../fluent-design-system.js';
import { Button } from './button.js';
import { styles } from './button.styles.js';
import { template } from './button.template.js';

/**
 * The definition for the Fluent Button component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-button>`
 */
export const definition = Button.compose({
  name: `${FluentDesignSystem.prefix}-button`,
  template,
  styles,
});
