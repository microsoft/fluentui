import { customElement } from '@microsoft/fast-element';
import { buttonTemplate as template } from './toggle-button.template';
import { ToggleButton } from './toggle-button';
import { toggleButtonStyles as styles } from './toggle-button.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-toggle-button>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-toggle-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentToggleButton extends ToggleButton {}
