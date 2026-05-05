import { tagName } from './anchor-button.options.js';
import { AnchorButton } from './anchor-button.js';
import { styles } from './anchor-button.styles.js';
import { template } from './anchor-button.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor-button\>
 */
export const definition = AnchorButton.compose({
  name: tagName,
  template,
  styles,
});
