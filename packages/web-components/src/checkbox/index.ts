import { customElement } from '@microsoft/fast-element';
import { Checkbox, CheckboxTemplate as template } from '@microsoft/fast-foundation';
import { CheckboxStyles as styles } from './checkbox.styles';

/**
 * The FAST Checkbox Element. Implements {@link @microsoft/fast-foundation#Checkbox},
 * {@link @microsoft/fast-foundation#CheckboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-checkbox\>
 */
@customElement({
  name: 'fast-checkbox',
  template,
  styles,
})
export class FASTCheckbox extends Checkbox {}
