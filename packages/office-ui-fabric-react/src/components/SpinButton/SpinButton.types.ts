import * as React from 'react';
import { Position } from '../../utilities/positioning';
import { IIconProps } from '../../Icon';
import { ITheme, IStyle } from '../../Styling';
import { ISpinButtonClassNames } from './SpinButton.classNames';
import { KeyboardSpinDirection } from './SpinButton';
import { IButtonStyles } from '../../Button';
import { IKeytipProps } from '../../Keytip';
import { IRefObject } from '../../Utilities';
import { IButtonProps } from '../Button/Button.types';

/**
 * {@docCategory SpinButton}
 */
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

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<ISpinButton>;

  /**
   * The initial value of the SpinButton. Use this if you intend for the SpinButton to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @defaultvalue 0
   */
  defaultValue?: string;

  /**
   * The value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: string;

  /**
   * The min value of the SpinButton.
   * @defaultvalue 0
   */
  min?: number;

  /**
   * The max value of the SpinButton.
   * @defaultvalue 10
   */
  max?: number;

  /**
   * The difference between the two adjacent values of the SpinButton.
   * This value is sued to calculate the precision of the input if no
   * precision is given. The precision calculated this way will always
   * be \>= 0.
   * @defaultvalue 1
   */
  step?: number;

  /**
   * A description of the SpinButton for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Optional prop to add a string id that can be referenced inside the aria-describedby attribute
   */
  ariaDescribedBy?: string;

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
  label?: string;

  /**
   * @defaultvalue Left
   */
  labelPosition?: Position;

  /**
   * Icon that goes along with the label for the whole SpinButton
   */
  iconProps?: IIconProps;

  /**
   * This callback is triggered when the value inside the SpinButton should be validated.
   * @param value - The value entered in the SpinButton to validate
   * @param event - The event that triggered this validate, if any. (For accessibility)
   * @returns If a string is returned, it will be used as the value of the SpinButton.
   */
  onValidate?: (value: string, event?: React.SyntheticEvent<HTMLElement>) => string | void;

  /**
   * This callback is triggered when the increment button is pressed or if the user presses up arrow
   * with focus on the input of the spinButton
   * @returns If a string is returned, it will be used as the value of the SpinButton.
   */
  onIncrement?: (value: string) => string | void;

  /**
   * This callback is triggered when the decrement button is pressed or if the user presses down arrow
   * with focus on the input of the spinButton
   * @returns If a string is returned, it will be used as the value of the SpinButton.
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
   */
  styles?: Partial<ISpinButtonStyles>;

  /**
   * Custom function for providing the classNames for the spinbutton. Can be used to provide
   * all styles for the component instead of applying them on top of the default styles.
   */
  getClassNames?: (
    theme: ITheme,
    disabled: boolean,
    isFocused: boolean,
    keyboardSpinDirection: KeyboardSpinDirection,
    labelPosition?: Position,
    className?: string
  ) => ISpinButtonClassNames;

  /**
   * Custom styles for the upArrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   */
  upArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Custom styles for the downArrow button.
   *
   * Note: The buttons are in a checked state when arrow keys are used to
   * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
   * for styling when that is the case.
   */
  downArrowButtonStyles?: Partial<IButtonStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Accessibile label text for the increment button for the benefit of the screen reader.
   */
  incrementButtonAriaLabel?: string;

  /**
   * Accessibile label text for the decrement button for the benefit of the screen reader.
   */
  decrementButtonAriaLabel?: string;

  /**
   * To how many decimal places the value should be rounded to.
   * The default value is calculated based on the precision of step.
   * IE: if step = 1, precision = 0. step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
   */
  precision?: number;

  /**
   * The position in the parent set (if in a set) for aria-posinset.
   */
  ariaPositionInSet?: number;

  /**
   * The total size of the parent set (if in a set) for aria-setsize.
   */
  ariaSetSize?: number;

  /**
   * Sets the aria-valuenow of the spin button. The component must be
   * controlled by the creator who controls the value externally.
   * ariaValueNow would be the numeric form of value.
   */
  ariaValueNow?: number;

  /*
   * Sets the aria-valuetext of the spin button. The component must be
   * controlled by the creator who controls the values externally.
   */
  ariaValueText?: string;

  /**
   * Optional keytip for this spin button
   */
  keytipProps?: IKeytipProps;

  /**
   * Optional input props on spin button
   */
  inputProps?: React.InputHTMLAttributes<HTMLElement | HTMLInputElement>;

  /**
   * Optional iconButton props on spin button
   */
  iconButtonProps?: IButtonProps;
}

/**
 * {@docCategory SpinButton}
 */
export interface ISpinButtonStyles {
  /**
   * Styles for the root of the spin button component.
   */
  root: IStyle;

  /**
   * Style for the label wrapper element of the component.
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
   * @deprecated Disabled styles taken care by `Label` component.
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
