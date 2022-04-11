import { customElement, FASTElement, html } from '@microsoft/fast-element';
import { splitButtonStyles as styles } from './split-button.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-split-button>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-split-button',
  template: html`<slot></slot>`,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentSplitButton extends FASTElement {}
