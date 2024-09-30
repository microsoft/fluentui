import { FluentDesignSystem } from '../fluent-design-system.js';
import { SplitButton } from './split-button.js';
import { styles } from './split-button.styles.js';
import { template } from './split-button.template.js';

/**
 * The definition for the Fluent Button component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-button>`
 */
export const definition = SplitButton.compose({
  name: `${FluentDesignSystem.prefix}-split-button`,
  template,
  styles,
});
