import { attr } from '@microsoft/fast-element';
import { FASTDialog } from '@microsoft/fast-foundation';

/**
 * Dialog component that extends the FASTDialog class.
 * It provides additional functionality for handling alerts and emitting events on hidden state changes.
 *
 * @public
 * @extends FASTDialog
 */
export class Dialog extends FASTDialog {
  /**
   * Indicates whether the dialog is an alert.
   *
   * @public
   * @defaultValue false
   * @remarks
   * HTML Attribute: alert
   */
  @attr({ mode: 'boolean' })
  public alert: boolean = false;

  /**
   * Dismisses the dialog.
   * If the dialog is an alert, it only triggers the super.dismiss() method.
   * Otherwise, it sets the hidden property to true.
   *
   * @public
   */
  public dismiss(): void {
    super.dismiss();
    if (this.alert) return;
    this.hidden = true;
  }

  /**
   * Event handler for the hiddenChanged event.
   * Emits the onHiddenChange event with the current hidden state.
   *
   * @public
   */
  public hiddenChanged() {
    this.$emit('onHiddenChange', this.hidden);
  }
}
