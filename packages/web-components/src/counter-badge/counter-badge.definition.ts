import { tagName } from './counter-badge.options.js';
import { CounterBadge } from './counter-badge.js';
import { styles } from './counter-badge.styles.js';
import { template } from './counter-badge.template.js';

/**
 * @public
 * @remarks
 * HTML Element: \<fluent-counter-badge\>
 */
export const definition = CounterBadge.compose({
  name: tagName,
  template,
  styles,
});
