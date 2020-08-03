import { customElement } from '@microsoft/fast-element';
import { RadioGroup, RadioGroupTemplate as template } from '@microsoft/fast-foundation';
import { RadioGroupStyles as styles } from './radio-group.styles';

/**
 * The FAST Radio Group Element. Implements {@link @microsoft/fast-foundation#RadioGroup},
 * {@link @microsoft/fast-foundation#RadioGroupTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-radio-group\>
 */
@customElement({
  name: 'fast-radio-group',
  template,
  styles,
})
export class FASTRadioGroup extends RadioGroup {}

/**
 * Styles for RadioGroup
 * @public
 */
export const RadioGroupStyles = styles;
