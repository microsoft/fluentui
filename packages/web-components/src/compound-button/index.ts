import { ButtonOptions, buttonTemplate as template } from '@microsoft/fast-foundation';
import { Button } from '../button';
import { baseHeightMultiplier } from '../design-tokens';
import { compoundButtonStyles as styles } from './compound-button.styles';

/**
 * The Fluent compound button class
 * @internal
 */
export class CompoundButton extends Button {
  public connectedCallback() {
    super.connectedCallback();

    baseHeightMultiplier.setValueFor(this, 16);
  }
}

/**
 * The Fluent Compound Button Element. Implements {@link Button},
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-compound-button\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fluentCompoundButton = CompoundButton.compose<ButtonOptions>({
  baseName: 'compound-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});

/**
 * Styles for Compound Button
 * @public
 */
export const compoundButtonStyles = styles;
