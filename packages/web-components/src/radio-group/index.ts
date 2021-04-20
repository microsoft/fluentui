import { RadioGroup, radioGroupTemplate as template } from '@microsoft/fast-foundation';
import { radioGroupStyles as styles } from './radio-group.styles';

/**
 * The FAST Radio Group Element. Implements {@link @microsoft/fast-foundation#RadioGroup},
 * {@link @microsoft/fast-foundation#radioGroupTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-radio-group\>
 */
export const fastRadioGroup = RadioGroup.compose({
  baseName: 'radio-group',
  template,
  styles,
});

/**
 * Styles for RadioGroup
 * @public
 */
export const radioGroupStyles = styles;
