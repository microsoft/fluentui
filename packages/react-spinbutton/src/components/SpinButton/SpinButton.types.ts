import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type * as React from 'react';

export type SpinButtonSlots = {
  /**
   * The root element of SpinButton is a container `<div>`.
   * The root slot receives the `className` and `style` specified on the `<SpinButton>`.
   * All other native props are applied to the primary slot: `input`.
   */
  root: Slot<'div'>;

  /**
   * Input that displays the current value and accepts direct input from the user.
   * Displayed value is formatted.
   *
   * This is the primary slot.
   */
  input: Slot<'input'>;

  /**
   * Renders the increment control.
   */
  incrementControl: Slot<'button'>;

  /**
   * Renders the decrement control.
   */
  decrementControl: Slot<'button'>;
};

export type SpinButtonChangeData = {
  /**
   * New value after the change.
   * E.g., `1`
   */
  value: number;
};

export type SpinButtonFormatter = (value: number) => string;
export type SpinButtonParser = (formattedValue: string) => number;

export type SpinButtonCommons = {
  /**
   * Initial value of the control (assumed to be valid). Updates to this prop will not be respected.
   *
   * Use this if you intend for the SpinButton to be an uncontrolled component which maintains its
   * own value. For a controlled component, use `value` instead. (Mutually exclusive with `value`.)
   * @defaultvalue 0
   */
  defaultValue: number; // Initial value of the

  /**
   * Current value of the control (assumed to be valid).
   *
   * Only provide this if the SpinButton is a controlled component where you are maintaining its
   * current state and passing updates based on change events; otherwise, use the `defaultValue`
   * property. (Mutually exclusive with `defaultValue`.)
   */
  value: number;

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
   * The precision calculated this way will always be \>= 0.
   * @defaultvalue 1
   */
  step: number;

  /**
   * Function used to format the displayed value in the component.
   * This allows for things like:
   * - Displaying the value as a monetary value: $1.00
   * - Displaying the value with a suffix: 12pt
   *
   * If this function is not supplied the default converts `value` to a string.
   */
  formatter: SpinButtonFormatter;

  /**
   * Function used to parse a formatted value back into a number.
   * This works in conjunction with `formatter` and is its inverse (i.e., `formatter` turns
   * 1 to $1.00 and `parser` turns $1.00 to 1).
   *
   * If this function is not supplied the default calls `parseFloat()` on the formatted value.
   */
  parser: SpinButtonParser;

  /**
   * Callback for when the committed value changes.
   * - User presses the up/down buttons (on single press or every spin)
   * - User presses the up/down arrow keys (on single press or every spin)
   * - User *commits* edits to the input text by focusing away (blurring) or pressing enter.
   *   Note that this is NOT called for every key press while the user is editing.
   */
  onChange: (event: React.SyntheticEvent<HTMLElement>, data: SpinButtonChangeData) => void;

  /**
   * How many decimal places the value should be rounded to.
   *
   * The default is calculated based on the precision of `step`: i.e. if step = 1, precision = 0.
   * step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
   */
  precision: number;
};

/**
 * SpinButton Props
 */
export type SpinButtonProps = ComponentProps<SpinButtonSlots, 'input'> & Partial<SpinButtonCommons>;

/**
 * State used in rendering SpinButton
 */
export type SpinButtonState = ComponentState<SpinButtonSlots> & Partial<SpinButtonCommons>;
