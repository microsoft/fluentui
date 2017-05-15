import { Position } from '../../utilities/positioning';
import { IIconProps } from '../../Icon';

export interface ISpinButtonProps {

  /**
   * The initial value of the SpinButton. Use this if you intend for the SpinButton to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @default 0
   */
  defaultValue?: string;

  /**
   * The initial value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: string;

  /**
   * The width of the SpinButton (including the optional label).
   * @default 100%
   */
  width?: string;

  /**
   * The min value of the SpinButton.
   * @default 0
   */
  min?: number;

  /**
   * The max value of the SpinButton.
   * @default 10
   */
  max?: number;

  /**
   * The difference between the two adjacent values of the SpinButton.
   * @default 1
   */
  step?: number;

  /**
   * Callback when the value has been changed.
   */
  onChange?: (value: number) => void;

  /**
   * A description of the SpinButton for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether or not the SpinButton is disabled.
   */
  disabled?: boolean;

  /**
  * Optional className for SpinButton.
  */
  className?: string;

  /**
   * Descriptive label for the SpinButton.
   */
  label: string;

  /**
   * @default: Left
   */
  labelPosition?: Position;

  /**
   * @default: 10
   */
  labelGapSpace?: number;

  /**
   * Icon that goes along with the label for the whole SpinButton
   */
  iconProps?: IIconProps;

  /**
   * This callback is triggered when the value inside the SpinButton should be validated.
   * @return {string} The new value after validation
   */
  onValidate?: (value: string) => string;

  /**
   * This callback is triggered when the increment button is pressed or if the user presses up arrow with focus on the input of the spinButton
   */
  onIncrement?: (value: string) => string;

  /**
   * This callback is triggered when the decrement button or if the user presses down arrow with focus on the input of the spinButton
   */
  onDecrement?: (value: string) => string;

  /**
   * Icon for the increment button of the spinButton
   */
  incrementButtonIcon?: IIconProps;

  /**
   * Icon for the decrement button of the spinButton
   */
  decrementButtonIcon?: IIconProps;
}

export interface ISpinButton {
  value?: number;
}