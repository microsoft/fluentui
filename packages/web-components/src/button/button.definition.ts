import { tagName } from './button.options.js';
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
export const definition = await Button.compose({
  name: tagName,
  template,
  styles,
});
