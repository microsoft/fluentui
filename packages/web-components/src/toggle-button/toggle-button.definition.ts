import { tagName } from './toggle-button.options.js';
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
  name: tagName,
  template,
  styles,
});
