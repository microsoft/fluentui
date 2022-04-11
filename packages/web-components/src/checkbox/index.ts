import { customElement } from '@microsoft/fast-element';
import { checkboxTemplate as template } from './checkbox.template';
import { Checkbox } from './checkbox';
import { checkboxStyles as styles } from './checkbox.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-checkbox>`
 */
@customElement({
  name: 'fluent-checkbox',
  template,
  styles,
})
export class FluentCheckbox extends Checkbox {}
