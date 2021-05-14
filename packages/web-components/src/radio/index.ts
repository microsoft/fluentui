import { Radio, radioTemplate as template } from '@microsoft/fast-foundation';
import { radioStyles as styles } from './radio.styles';

/**
 * The Fluent Radio Element. Implements {@link @microsoft/fast-foundation#Radio},
 * {@link @microsoft/fast-foundation#radioTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio\>
 */
export const fluentRadio = Radio.compose({
  baseName: 'radio',
  template,
  styles,
});

/**
 * Styles for Radio
 * @public
 */
export const RadioStyles = styles;
