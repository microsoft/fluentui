import { tagName } from './compound-button.options.js';
import { CompoundButton } from './compound-button.js';
import { styles } from './compound-button.styles.js';
import { template } from './compound-button.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-comopund-button\>
 */
export const definition = CompoundButton.compose({
  name: tagName,
  template,
  styles,
});
