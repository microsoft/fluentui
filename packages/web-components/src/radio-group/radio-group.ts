import {
  colorCompoundBrandForeground1,
  colorCompoundBrandStroke,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralStrokeAccessible,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXS,
} from '@fluentui/web-components';
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
      this.style.setProperty('--control-border-color-checked', `${colorNeutralForegroundDisabled.$value}`);
      this.style.setProperty('--control-border-color', `${colorNeutralForegroundDisabled.$value}`);
      this.style.setProperty('--checked-indicator-background-color', `${colorNeutralForegroundDisabled.$value}`);
      this.style.setProperty('--label-color', `${colorNeutralForegroundDisabled.$value}`);
    }
    if (this.stacked) {
      this.style.setProperty(
        '--stacked-padding',
        `${spacingVerticalXS.$value} ${spacingHorizontalS.$value} ${spacingVerticalS.$value} ${spacingHorizontalS.$value}`,
      );
    }
  }

  protected slottedRadioButtonsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void {
    super.slottedRadioButtonsChanged(oldValue, newValue);
    this.style.setProperty('--control-border-color-checked', `${colorCompoundBrandStroke.$value}`);
    this.style.setProperty('--control-border-color', `${colorNeutralStrokeAccessible.$value}`);
    this.style.setProperty('--checked-indicator-background-color', `${colorCompoundBrandForeground1.$value}`);
    this.style.setProperty('--label-color', `${colorNeutralForeground3.$value}`);
    this.style.setProperty(
      '--stacked-padding',
      `${spacingVerticalSNudge.$value} ${spacingHorizontalS.$value} ${spacingVerticalSNudge.$value} ${spacingHorizontalXS.$value}`,
    );

    if (this.disabled || this.stacked) {
      this.createLocalTokens();
    }
  }
}
