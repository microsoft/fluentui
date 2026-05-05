import { styles } from '../button/button.styles.js';
import { tagName } from './menu-button.options.js';
import { MenuButton } from './menu-button.js';
import { template } from './menu-button.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 */
export const definition = MenuButton.compose({
  name: tagName,
  template,
  styles,
});
