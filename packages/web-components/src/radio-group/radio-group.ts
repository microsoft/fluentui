import { colorNeutralForegroundDisabled } from '@fluentui/web-components';
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

  protected createLocalTokens(): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabled) {
      this.style.setProperty('--control-border-color', `${colorNeutralForegroundDisabled.$value}`);
      this.style.setProperty('--checked-indicator-background-color', `${colorNeutralForegroundDisabled.$value}`);
      this.style.setProperty('--state-color', `${colorNeutralForegroundDisabled.$value}`);
    }
  }

  protected slottedRadioButtonsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void {
    super.slottedRadioButtonsChanged(oldValue, newValue);
    if (this.disabled) {
      this.createLocalTokens();
    }
  }
}
