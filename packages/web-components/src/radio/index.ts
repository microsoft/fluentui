import { customElement } from '@microsoft/fast-element';
import { Radio, RadioTemplate as template } from '@microsoft/fast-foundation';
import { RadioStyles as styles } from './radio.styles';

/**
 * The FAST Radio Element. Implements {@link @microsoft/fast-foundation#Radio},
 * {@link @microsoft/fast-foundation#RadioTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-radio\>
 */
@customElement({
  name: 'fast-radio',
  template,
  styles,
})
export class FASTRadio extends Radio {}
