import { customElement, html } from '@microsoft/fast-element';
import { CounterBadge } from './counter-badge';
import { counterBadgeStyles as styles } from './counter-badge.styles';

/**
 * THe Badge component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-counter-badge>`
 */
@customElement({
  name: 'fluent-counter-badge',
  template: html<CounterBadge>`
    <template :hidden=${x => x.hidden ?? (!x.showzero && x.count === 0 && !x.dot)}>
      <slot><span>${x => x.setCount()}</span></slot>
    </template>
  `,
  styles,
})
export class FluentCounterBadge extends CounterBadge {}
