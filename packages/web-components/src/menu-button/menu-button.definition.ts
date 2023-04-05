import { FluentDesignSystem } from '../fluent-design-system.js';
import { styles } from '../button/button.styles.js';
import { MenuButton } from './menu-button.js';
import { template } from './menu-button.template.js';

/**
 * The Fluent Menu Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 */
export const definition = MenuButton.compose({
  name: `${FluentDesignSystem.prefix}-menu-button`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
