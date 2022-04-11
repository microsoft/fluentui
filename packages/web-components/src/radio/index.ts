import { customElement } from '@microsoft/fast-element';
import { radioTemplate as template } from './radio.template';
import { Radio } from './radio';
import { radioStyles as styles } from './radio.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-radio>`
 */
@customElement({
  name: 'fluent-radio',
  template,
  styles,
})
export class FluentRadio extends Radio {}
