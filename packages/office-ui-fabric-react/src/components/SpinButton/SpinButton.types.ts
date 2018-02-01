import * as React from 'react';
import { Position } from '../../utilities/positioning';
import { IIconProps } from '../../Icon';
import { ITheme, IStyle } from '../../Styling';
import { IButtonStyles } from '../../Button';
import { IStyleFunction } from '../../Utilities';
import { SpinButtonBase, KeyboardSpinDirection } from './SpinButton.base';

export interface ISpinButton {
  /**
   * The value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: string;

  /**
   * Sets focus to the spin button.
   */
  focus: () => void;
}

export interface ISpinButtonProps extends React.Props<SpinButtonBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component?: ISpinButton) => void;

  /**
   * The initial value of the SpinButton. Use this if you intend for the SpinButton to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @default 0
   */
  defaultValue?: string;

  /**
   * The value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: string;

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
   * A description of the SpinButton for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * A title for the SpinButton used for a more descriptive name that's also visible on its tooltip.
   */
  title?: string;

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
   * Icon that goes along with the label for the whole SpinButton
   */
  iconProps?: IIconProps;

  /**
   * This callback is triggered when the value inside the SpinButton should be validated.
   * @return {string | void} If a string is returned, it will be used as the value of the SpinButton.
   */
  onValidate?: (value: string) => string | void;

  /**
   * This callback is triggered when the increment button is pressed or if the user presses up arrow with focus on the input of the spinButton
   * @return {string | void} If a string is returned, it will be used as the value of the SpinButton.
   */
  onIncrement?: (value: string) => string | void;

  /**
   * This callback is triggered when the decrement button is pressed or if the user presses down arrow with focus on the input of the spinButton
   * @return {string | void} If a string is returned, it will be used as the value of the SpinButton.
   */
  onDecrement?: (value: string) => string | void;

  /**
   * A callback for when the user put focus on the picker
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Icon for the increment button of the spinButton
   */
  incrementButtonIcon?: IIconProps;

  /**
   * Icon for the decrement button of the spinButton
   */
  decrementButtonIcon?: IIconProps;

  /**
   * Custom styling for individual elements within the button DOM.
   *
   * @deprecated styles prop will be removed in favor of getStyles in 6.0
   */
  styles?: Partial<ISpinButtonStyles>;

  /**
   * Custom styles for the upArrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   *
   * @deprecated upArrowButtonStyles prop will be removed in favor of getUpArrowButtonStyles in 6.0
   */
  upArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Custom styles for the downArrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   *
   * @deprecated upArrowButtonStyles prop will be removed in favor of getUpArrowButtonStyles in 6.0
   */
  downArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Custom styling function for the spinButton
   */
  getStyles?: IStyleFunction<ISpinButtonStyleProps, ISpinButtonStyles>;

  /**
   * Custom styling function for the spinButton's up arrow
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   */
  getUpArrowButtonStyles?: IStyleFunction<ISpinButtonArrowStyleProps, IButtonStyles>;

  /**
   * Custom styling function for the spinButton's down arrow
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   */
  getDownArrowButtonStyles?: IStyleFunction<ISpinButtonArrowStyleProps, IButtonStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Accessibility label text for the increment button for the benefit of the screen reader.
   */
  incrementButtonAriaLabel?: string;

  /**
   * Accessibility label text for the decrement button for the benefit of the screen reader.
   */
  decrementButtonAriaLabel?: string;
}

export interface ISpinButtonStyleProps {
  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Whether or not the SpinButton is disabled.
   */
  disabled?: boolean;

  /**
   * Whether focus is on the component
   */
  isFocused?: boolean;

  /**
   * keyboard spin direction, used to style the up or down button
   * as active when up/down arrow is pressed
   */
  keyboardSpinDirection?: KeyboardSpinDirection;

  /**
   * @default: Left
   */
  labelPosition?: Position;

  /**
   * Custom styles that are piped into the getStyles funtion
   */
  customStyles?: Partial<ISpinButtonStyles>;
}

export interface ISpinButtonArrowStyleProps {
  /**
   * Theme provided by HOC.
   */
  theme: ITheme;

  /**
   * Custom styles for the up arrow button that are piped into the getStyles funtion
   */
  upArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Custom styles for the down arrow button that are piped into the getStyles funtion
   */
  downArrowButtonStyles?: Partial<IButtonStyles>;
}

export interface ISpinButtonStyles {
  /**
   * Styles for the root of the spin button component.
   */
  root: IStyle;

  /**
   * Style for the label wrapper element of the component
   * The label wrapper contains the icon and the label.
   */
  labelWrapper: IStyle;

  /**
   * Style override when the label is positioned at the start.
   */
  labelWrapperStart: IStyle;

  /**
   * Style override when the label is positioned at the end.
   */
  labelWrapperEnd: IStyle;

  /**
   * Style override when the label is positioned at the top.
   */
  labelWrapperTop: IStyle;

  /**
   * Style override when the label is positioned at the bottom.
   */
  labelWrapperBottom: IStyle;

  /**
   * Style for the icon.
   */
  icon: IStyle;

  /**
 * Style for the icon.
 */
  iconDisabled: IStyle;

  /**
   * Style for the label text
   */
  label: IStyle;

  /**
   * Style for the label text
   */
  labelDisabled: IStyle;

  /**
   * Style for spinButtonWrapper when enabled.
   */
  spinButtonWrapper: IStyle;

  /**
   * Style override when label is positioned at the top/bottom.
   */
  spinButtonWrapperTopBottom: IStyle;

  /**
   * Style override when spinButton is enabled/hovered.
   */
  spinButtonWrapperHovered: IStyle;

  /**
   * Style override when spinButton is enabled/focused.
   */
  spinButtonWrapperFocused: IStyle;

  /**
   * Style override when spinButton is disabled.
   */
  spinButtonWrapperDisabled: IStyle;

  /**
   * Styles for the input.
   */
  input: IStyle;

  /**
   * Style override for ::selection
   */
  inputTextSelected: IStyle;

  /**
   * Style override when spinButton is disabled.
   */
  inputDisabled: IStyle;

  /**
   * Styles for the arrowButtonsContainer
   */
  arrowButtonsContainer: IStyle;

  /**
   * Style override for the arrowButtonsContainer when spin button is disabled.
   */
  arrowButtonsContainerDisabled: IStyle;
}
