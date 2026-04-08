import { Updates } from '@microsoft/fast-element';
import { polyfill as focusgroupPolyfill } from '@microsoft/focusgroup-polyfill';
import { BaseRadioGroup } from './radio-group.base.js';

/**
 * A Radio Group Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#radiogroup | ARIA `radiogroup` role}.
 *
 * @tag fluent-radio-group
 *
 * @slot - The default slot for the radio group
 *
 * @public
 */
export class RadioGroup extends BaseRadioGroup {
  /** @internal */
  public connectedCallback() {
    super.connectedCallback();

    Updates.enqueue(() => {
      focusgroupPolyfill(this);
    });
  }
}
