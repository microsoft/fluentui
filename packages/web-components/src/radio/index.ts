import { Radio, RadioOptions, radioTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentRadio = Radio.compose<RadioOptions>({
  baseName: 'radio',
  template,
  styles,
  checkedIndicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="4"/>
    </svg>
  `,
});

/**
 * Styles for Radio
 * @public
 */
export const RadioStyles = styles;

/**
 * Radio base class
 * @public
 */
export { Radio };
