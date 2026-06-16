import { tagName } from './badge.options.js';
import { Badge } from './badge.js';
import { styles } from './badge.styles.js';
import { template } from './badge.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = await Badge.compose({
  name: tagName,
  template,
  styles,
});
