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

  @attr({ attribute: 'stacked', mode: 'boolean' })
  public stacked: boolean = false;

  protected layoutChanged(): void {
    if (this.$fastController.isConnected && this.slottedRadioButtons !== undefined) {
      this.slottedRadioButtons.forEach((item: HTMLElement, index: number) => {
        if (this.stacked && this.orientation === 'horizontal') {
          item.setAttribute('stack', '');
        } else {
          item.removeAttribute('stack');
        }
      });
    }
  }

  protected slottedRadioButtonsChanged(): void {
    super.slottedRadioButtonsChanged(this.slottedRadioButtons, this.slottedRadioButtons);
    if (this.stacked) {
      this.layoutChanged();
    }
  }
}
