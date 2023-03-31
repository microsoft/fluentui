import { FluentDesignSystem } from '../fluent-design-system.js';
import { ToggleButton } from './toggle-button.js';
import { styles } from './toggle-button.styles.js';
import { template } from './toggle-button.template.js';

/**
 * The Fluent Toggle Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toggle-button\>
 */
export const definition = ToggleButton.compose({
  name: `${FluentDesignSystem.prefix}-toggle-button`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
