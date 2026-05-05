import { tagName } from './spinner.options.js';
import { Spinner } from './spinner.js';
import { styles } from './spinner.styles.js';
import { template } from './spinner.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-spinner\>
 */
export const definition = Spinner.compose({
  name: tagName,
  template,
  styles,
});
