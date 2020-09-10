import { customElement } from '@microsoft/fast-element';
import { Checkbox, CheckboxTemplate as template } from '@microsoft/fast-foundation';
import { CheckboxStyles as styles } from './checkbox.styles';

/**
 * The Fluent Checkbox Element. Implements {@link @microsoft/fast-foundation#Checkbox},
 * {@link @microsoft/fast-foundation#CheckboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-checkbox\>
 */
@customElement({
  name: 'fluent-checkbox',
  template,
  styles,
})
export class FluentCheckbox extends Checkbox {}

/**
 * Styles for Checkbox
 * @public
 */
export const CheckboxStyles = styles;
