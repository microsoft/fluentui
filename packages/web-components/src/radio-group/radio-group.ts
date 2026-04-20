import { FocusGroup } from '@microsoft/focusgroup-polyfill/focusgroup.js';
import type { FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/shadowless';
import type { Radio } from '../radio/radio.js';
import { ItemCollection } from '../utils/focusgroup.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
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
  /** @private */
  fg!: FocusGroup;

  /** @private */
  fgItems!: FocusGroupItemCollection;

  connectedCallback() {
    super.connectedCallback();

    waitForConnectedDescendants(this, () => {
      this.fg = new FocusGroup(this, this.fgItems);
    });
  }

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  public radiosChanged(prev: Radio[] | undefined, next: Radio[] | undefined): void {
    super.radiosChanged(prev, next);

    if (!this.fgItems && this.radios) {
      this.fgItems = new ItemCollection({
        owner: this,
        list: this.radios,
      });
    }
  }
}
