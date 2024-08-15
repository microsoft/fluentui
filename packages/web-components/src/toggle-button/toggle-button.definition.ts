import { FluentDesignSystem } from '../fluent-design-system.js';
import { ToggleButton } from './toggle-button.js';
import { styles } from './toggle-button.styles.js';
import { template } from './toggle-button.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toggle-button\>
 */
export const definition = ToggleButton.compose({
  name: `${FluentDesignSystem.prefix}-toggle-button`,
  template,
  styles,
});
