import { customElement } from '@microsoft/fast-element';
import { radioGroupTemplate as template } from './radio-group.template';
import { RadioGroup } from './radio-group';
import { radioGroupStyles as styles } from './radio-group.styles';

/**
 * A function that returns a Radio Group registration for configuring the component with a DesignSystem.
 * Implements
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-radio-group>`
 */
@customElement({
  name: 'fluent-radio-group',
  template,
  styles,
})
export class FluentRadioGroup extends RadioGroup {}
