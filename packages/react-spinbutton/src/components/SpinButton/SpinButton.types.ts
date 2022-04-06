import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
// import { Input } from '@fluentui/react-input';
import * as React from 'react';

export type SpinButtonSlots = {
  /**
   * The root element of SpinButton is a container `<div>`.
   * The root slot receives the `className` and `style` specified on the `<SpinButton>`.
   * All other native props are applied to the primary slot: `input`.
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * Input that displays the current value and accepts direct input from the user.
   * Displayed value is formatted.
   *
   * This is the primary slot.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * Renders the increment control.
   */
  incrementButton: NonNullable<Slot<'button'>>;

  /**
   * Renders the decrement control.
   */
  decrementButton: NonNullable<Slot<'button'>>;
};

export type SpinButtonCommons = {
  /**
   * Initial value of the control (assumed to be valid). Updates to this prop will not be respected.
   *
   * Use this if you intend for the SpinButton to be an uncontrolled component which maintains its
   * own value. For a controlled component, use `value` instead. (Mutually exclusive with `value`.)
   */
  defaultValue: number;

  /**
   * Current value of the control (assumed to be valid).
   *
   * Only provide this if the SpinButton is a controlled component where you are maintaining its
   * current state and passing updates based on change events; otherwise, use the `defaultValue`
   * property. (Mutually exclusive with `defaultValue`.)
   */
  value: number;

  /**
   * String representation of `value`.
   *
   * Use this when displaying the value to users as something other than a plain number.
   * For example, when displaying currency values this might be "$1.00" when value is `1`.
   *
   * Only provide this if the SpinButton is a controlled component where you are maintaining its
   * current state and passing updates based on change events. When SpinButton is used as an
   * uncontrolled component this prop is ignored.
   */
  displayValue: string;

  /**
   * Min value of the control. If not provided, the control has no minimum value.
   */
  min: number;

  /**
   * Max value of the control. If not provided, the control has no maximum value.
   */
  max: number;

  /**
   * Difference between two adjacent values of the control.
   * This value is used to calculate the precision of the input if no `precision` is given.
   * The precision calculated this way will always be greater than or equal 0.
   * @default 1
   */
  step: number;

  /**
   * Large difference between two values. This should be greater than `step` and is used
   * when users hit the Page Up or Page Down keys.
   * @default 1
   */
  stepPage: number;

  /**
   * Callback for when the committed value changes.
   * - User presses the up/down buttons (on single press or every spin)
   * - User presses the up/down arrow keys (on single press or every spin)
   * - User *commits* edits to the input text by focusing away (blurring) or pressing enter.
   *   Note that this is NOT called for every key press while the user is editing.
   */
  onChange: (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => void;

  /**
   * How many decimal places the value should be rounded to.
   *
   * The default is calculated based on the precision of `step`: i.e. if step = 1, precision = 0.
   * step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
   */
  precision: number;

  /**
   * Controls the colors and borders of the input.
   * @default 'outline'
   */
  appearance: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /**
   * Size of the input.
   * @default 'medium'
   */
  size: 'small' | 'medium';

  /**
   * Controls which input types update the value.
   *
   * - 'all': both the spinner buttons and input field are enabled.
   * - 'spinners-only': only the spinner buttons are enabled.
   * @default all
   */
  inputType: 'all' | 'spinners-only';
};

/**
 * SpinButton Props
 */
export type SpinButtonProps = Omit<ComponentProps<Partial<SpinButtonSlots>, 'input'>, 'onChange' | 'size'> &
  Partial<SpinButtonCommons>;

/**
 * State used in rendering SpinButton
 */
export type SpinButtonState = ComponentState<SpinButtonSlots> &
  Partial<SpinButtonCommons> &
  Pick<SpinButtonCommons, 'appearance' | 'size'> & {
    /**
     * State used to track which direction, if any, SpinButton is currently spinning.
     * @default 'rest'
     */
    spinState: SpinButtonSpinState;

    /**
     * State used to track if the value is at the range bounds of [min-max].
     * @default 'none'
     */
    atBound: SpinButtonBounds;
  };

export type SpinButtonChangeEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.ChangeEvent<HTMLElement>
  | React.FocusEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>;

export type SpinButtonOnChangeData = {
  value?: number;
  displayValue?: string;
};

export type SpinButtonSpinState = 'rest' | 'up' | 'down';
export type SpinButtonBounds = 'none' | 'min' | 'max' | 'both';
