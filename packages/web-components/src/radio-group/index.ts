import { customElement } from '@microsoft/fast-element';
import { RadioGroup, RadioGroupTemplate as template } from '@microsoft/fast-foundation';
import { RadioGroupStyles as styles } from './radio-group.styles';

/**
 * The Fluent Radio Group Element. Implements {@link @microsoft/fast-foundation#RadioGroup},
 * {@link @microsoft/fast-foundation#RadioGroupTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio-group\>
 */
@customElement({
  name: 'fluent-radio-group',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentRadioGroup extends RadioGroup {}

/**
 * Styles for RadioGroup
 * @public
 */
export const RadioGroupStyles = styles;
