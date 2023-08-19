import * as React from 'react';
import { Position } from '../../Positioning';
import type { IButtonStyles, IButtonProps } from '../../Button';
import type { IIconProps } from '../../Icon';
import type { ITheme, IStyle } from '../../Styling';
import type { IKeytipProps } from '../../Keytip';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { ShadowConfig } from '@fluentui/merge-styles';

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButton {
  /**
   * Current committed/validated value of the control. Note that this does *not* update on every
   * keystroke while the user is editing text in the input field.
   * "committed" the edit yet by focusing away (blurring) or pressing enter,
   */
  value?: string;

  /**
   * Sets focus to the control.
   */
  focus: () => void;
}

/**
 * {@docCategory SpinButton}
 */
export enum KeyboardSpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1,
}

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<ISpinButton>;

  /**
   * Initial value of the control (assumed to be valid). Updates to this prop will not be respected.
   *
   * Use this if you intend for the SpinButton to be an uncontrolled component which maintains its
   * own value. For a controlled component, use `value` instead. (Mutually exclusive with `value`.)
   * @defaultvalue 0
   */
  defaultValue?: string;

  /**
   * Current value of the control (assumed to be valid).
   *
   * Only provide this if the SpinButton is a controlled component where you are maintaining its
   * current state and passing updates based on change events; otherwise, use the `defaultValue`
   * property. (Mutually exclusive with `defaultValue`.)
   */
  value?: string;

  /**
   * Min value of the control. If not provided, the control has no minimum value.
   */
  min?: number;

  /**
   * Max value of the control. If not provided, the control has no maximum value.
   */
  max?: number;

  /**
   * Difference between two adjacent values of the control.
   * This value is used to calculate the precision of the input if no `precision` is given.
   * The precision calculated this way will always be \>= 0.
   * @defaultvalue 1
   */
  step?: number;

  /**
   * A description of the control for the benefit of screen reader users.
   */
  ariaLabel?: string;

  /**
   * ID of a label which describes the control, if not using the default label.
   */
  ariaDescribedBy?: string;

  /**
   * A more descriptive title for the control, visible on its tooltip.
   */
  title?: string;

  /**
   * Whether or not the control is disabled.
   */
  disabled?: boolean;

  /**
   * Custom className for the control.
   */
  className?: string;

  /**
   * Descriptive label for the control.
   */
  label?: string;

  /**
   * Where to position the control's label.
   * @defaultvalue Left
   */
  labelPosition?: Position;

  /**
   * Props for an icon to display alongside the control's label.
   */
  iconProps?: IIconProps;

  /**
   * Callback for when the committed/validated value changes. This is called *after* `onIncrement`,
   * `onDecrement`, or `onValidate`, on the following events:
   * - User presses the up/down buttons (on single press or every spin)
   * - User presses the up/down arrow keys (on single press or every spin)
   * - User *commits* edits to the input text by focusing away (blurring) or pressing enter.
   *   Note that this is NOT called for every key press while the user is editing.
   */
  onChange?: (event: React.SyntheticEvent<HTMLElement>, newValue?: string) => void;

  /**
   * Callback for when the entered value should be validated.
   * @param value - The entered value to validate
   * @param event - The event that triggered this validate, if any (for accessibility)
   * @returns If a string is returned, it will be used as the new value
   */
  onValidate?: (value: string, event?: React.SyntheticEvent<HTMLElement>) => string | void;

  /**
   * Callback for when the increment button or up arrow key is pressed.
   * @param value - The current value to be incremented
   * @param event - The event that triggered this increment
   * @returns If a string is returned, it will be used as the new value
   */
  onIncrement?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => string | void;

  /**
   * Callback for when the decrement button or down arrow key is pressed.
   * @param value - The current value to be decremented
   * @param event - The event that triggered this decrement
   * @returns If a string is returned, it will be used as the new value
   */
  onDecrement?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => string | void;

  /**
   * Callback for when the user focuses the control.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Callback for when the control loses focus.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Custom props for the increment button.
   */
  incrementButtonIcon?: IIconProps;

  /**
   * Custom props for the decrement button.
   */
  decrementButtonIcon?: IIconProps;

  /**
   * Custom styling for individual elements within the control.
   */
  styles?: IStyleFunctionOrObject<ISpinButtonStyleProps, ISpinButtonStyles>;

  /**
   * Custom styles for the up arrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to increment/decrement
   * the SpinButton. Use `rootChecked` instead of `rootPressed` for styling when that is the case.
   */
  upArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Custom styles for the down arrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to increment/decrement
   * the SpinButton. Use `rootChecked` instead of `rootPressed` for styling when that is the case.
   */
  downArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Accessible label text for the increment button (for screen reader users).
   */
  incrementButtonAriaLabel?: string;

  /**
   * Accessible label text for the decrement button (for screen reader users).
   */
  decrementButtonAriaLabel?: string;

  /**
   * How many decimal places the value should be rounded to.
   *
   * The default is calculated based on the precision of `step`: i.e. if step = 1, precision = 0.
   * step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
   */
  precision?: number;

  /**
   * The position in the parent set (if in a set).
   */
  ariaPositionInSet?: number;

  /**
   * The total size of the parent set (if in a set).
   */
  ariaSetSize?: number;

  /**
   * Sets the control's aria-valuenow. This is the numeric form of `value`.
   * Providing this only makes sense when using as a controlled component.
   */
  ariaValueNow?: number;

  /*
   * Sets the control's aria-valuetext.
   * Providing this only makes sense when using as a controlled component.
   */
  ariaValueText?: string;

  /**
   * Keytip for the control.
   */
  keytipProps?: IKeytipProps;

  /**
   * Additional props for the input field.
   */
  inputProps?: React.InputHTMLAttributes<HTMLElement | HTMLInputElement>;

  /**
   * Additional props for the up and down arrow buttons.
   */
  iconButtonProps?: IButtonProps;
}

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonStyles {
  /**
   * Styles for the root of the component.
   */
  root: IStyle;

  /**
   * Style for the label wrapper element, which contains the icon and label.
   */
  labelWrapper: IStyle;

  /**
   * Style for the icon.
   */
  icon: IStyle;

  /**
   * Style for the label text.
   */
  label: IStyle;

  /**
   * Style for the wrapper element of the input field and arrow buttons.
   */
  spinButtonWrapper: IStyle;

  /**
   * Styles for the input.
   */
  input: IStyle;

  /**
   * Styles for the arrowButtonsContainer
   */
  arrowButtonsContainer: IStyle;

  __shadowConfig__?: ShadowConfig;
}

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonStyleProps {
  theme: ITheme;
  className: string | undefined;
  disabled: boolean;
  isFocused: boolean;
  keyboardSpinDirection: KeyboardSpinDirection;
  labelPosition: Position;
}
