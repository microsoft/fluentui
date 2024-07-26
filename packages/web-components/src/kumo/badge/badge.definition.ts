import { KumoBadge } from './badge.js';
import { styles } from './badge.styles.js';
import { template } from './badge.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = KumoBadge.compose({
  name: `kumo-badge`,
  template,
  styles,
});
