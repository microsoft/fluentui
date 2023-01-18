import { FluentDesignSystem } from '../fluent-design-system.js';
import { CounterBadge } from './counter-badge.js';
import { styles } from './counter-badge.styles.js';
import { template } from './counter-badge.template.js';

/**
 * The Fluent CounterBadge Element. Implements {@link @microsoft/fast-foundation#Badge },
 * {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-counter-badge\>
 */
export const definition = CounterBadge.compose({
  name: `${FluentDesignSystem.prefix}-counter-badge`,
  template,
  styles,
});
