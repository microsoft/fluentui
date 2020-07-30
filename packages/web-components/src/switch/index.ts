import { customElement } from '@microsoft/fast-element';
import { Switch, SwitchTemplate as template } from '@microsoft/fast-foundation';
import { SwitchStyles as styles } from './switch.styles';

/**
 * The FAST Switch Custom Element. Implements {@link @microsoft/fast-foundation#Switch},
 * {@link @microsoft/fast-foundation#SwitchTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-switch\>
 */
@customElement({
  name: 'fast-switch',
  template,
  styles,
})
export class FASTSwitch extends Switch {}
