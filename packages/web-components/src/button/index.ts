import { customElement } from '@microsoft/fast-element';
import { Button } from './button';
import { buttonTemplate as template } from './button.template';
import { buttonStyles as styles } from './button.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-button>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentButton extends Button {}
