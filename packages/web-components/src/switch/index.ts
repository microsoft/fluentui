import { customElement } from '@microsoft/fast-element';
import { Switch, SwitchTemplate as template } from '@microsoft/fast-foundation';
import { SwitchStyles as styles } from './switch.styles';

/**
 * The Fluent Switch Custom Element. Implements {@link @microsoft/fast-foundation#Switch},
 * {@link @microsoft/fast-foundation#SwitchTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-switch\>
 */
@customElement({
  name: 'fluent-switch',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentSwitch extends Switch {}

/**
 * Styles for Switch
 * @public
 */
export const SwitchStyles = styles;
