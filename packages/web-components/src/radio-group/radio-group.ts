import { FocusGroup } from '@microsoft/focusgroup-polyfill/shadowless';
import type { Radio } from '../radio/radio.js';
import { ArrayItemCollection } from '../utils/focusgroup.js';
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
  private fg!: FocusGroup;

  private fgItems!: ArrayItemCollection<Radio>;

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  public radiosChanged(prev: Radio[] | undefined, next: Radio[] | undefined): void {
    super.radiosChanged(prev, next);

    this.fgItems ??= new ArrayItemCollection<Radio>(
      () => this.enabledRadios?.filter(r => !r.hidden) ?? [],
      () => this.enabledRadios?.find(r => r.checked) ?? null,
    );
    if (!this.fg) {
      this.fg = new FocusGroup(this, this.fgItems, {
        definition: {
          behavior: 'radiogroup',
          axis: undefined,
          wrap: true,
        },
      });
    } else {
      this.fg.update();
    }
  }
}
