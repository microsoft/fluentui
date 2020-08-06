import { customElement } from '@microsoft/fast-element';
import { Radio, RadioTemplate as template } from '@microsoft/fast-foundation';
import { RadioStyles as styles } from './radio.styles';

/**
 * The Fluent Radio Element. Implements {@link @microsoft/fast-foundation#Radio},
 * {@link @microsoft/fast-foundation#RadioTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio\>
 */
@customElement({
  name: 'fluent-radio',
  template,
  styles,
})
export class FluentRadio extends Radio {}

/**
 * Styles for Radio
 * @public
 */
export const RadioStyles = styles;
