import { tagName } from './dialog.options.js';
import { Dialog } from './dialog.js';
import { template } from './dialog.template.js';
import { styles } from './dialog.styles.js';

/**
 * The Fluent Dialog Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog\>
 */
export const definition = Dialog.compose({
  name: tagName,
  template,
  styles,
});
