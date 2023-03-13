import { attr } from '@microsoft/fast-element';
import { FASTRadioGroup } from '@microsoft/fast-foundation';

/**
 * The base class used for constructing a fluent-radio-group custom element
 * @public
 */
export class RadioGroup extends FASTRadioGroup {
  /**
   * sets radio layout styles
   *
   * @public
   * @remarks
   * HTML Attribute: stacked
   */
  @attr({ mode: 'boolean' })
  public stacked: boolean = false;

  protected disableChanged(): void {
    if (!this.$fastController.isConnected) {
      return;
    }
    this.slottedRadioButtons.forEach((item: HTMLElement, index: number) => {
      if (this.disabled) {
        item.setAttribute('disabled', '');
      }
    });
  }

  protected slottedRadioButtonsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void {
    super.slottedRadioButtonsChanged(oldValue, newValue);
    if (this.disabled) {
      this.disableChanged();
    }
  }
}
