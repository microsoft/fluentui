import { RadioGroup, radioGroupTemplate as template } from '@microsoft/fast-foundation';
import { radioGroupStyles as styles } from './radio-group.styles';

/**
 * The Fluent Radio Group Element. Implements {@link @microsoft/fast-foundation#RadioGroup},
 * {@link @microsoft/fast-foundation#radioGroupTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio-group\>
 */
export const fluentRadioGroup = RadioGroup.compose({
  baseName: 'radio-group',
  template,
  styles,
});

/**
 * Styles for RadioGroup
 * @public
 */
export const radioGroupStyles = styles;

/**
 * Radio group base class
 * @public
 */
export { RadioGroup };
