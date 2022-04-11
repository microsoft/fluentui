import { customElement } from '@microsoft/fast-element';
import { compoundButtonTemplate as template } from './compound-button.template';
import { CompoundButton } from './compound-button';
import { compoundButtonStyles as styles } from './compound-button.styles';

/**
 * The compound button component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-compound-button>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-compound-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentCompoundButton extends CompoundButton {}
