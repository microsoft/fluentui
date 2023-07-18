import { attr } from '@microsoft/fast-element';
import { FASTDialog } from '@microsoft/fast-foundation';

/**
 * @class Dialog component
 */

export class Dialog extends FASTDialog {
  @attr({ mode: 'boolean' })
  public alert: boolean = false;

  public dismiss(): void {
    super.dismiss();
    if (this.alert) return;
    this.hidden = true;
  }

  public hiddenChanged() {
    this.$emit('onHiddenChange', this.hidden);
  }
}
