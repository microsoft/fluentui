import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

/**
 * Checkbox Props
 */
export interface CheckboxProps extends ComponentProps, Omit<React.HTMLAttributes<HTMLElement>, 'defaultChecked'> {
  /**
   * Children to be rendered as a Label.
   */
  children?: ShorthandProps<LabelProps>;

  /**
   * Icon to be displayed when the checkbox is in the checked state.
   */
  checkmarkIcon?: React.ReactElement;

  /**
   * Icon to be displayed when the checkbox is in the mixed state.
   */
  mixedIcon?: React.ReactElement;

  /**
   * Disabled state of the checkbox.
   */
  disabled?: boolean;

  /**
   * Required state of the checkbox.
   */
  required?: boolean;

  /**
   * A checkbox can be rendered with a circular shape.
   */
  circular?: boolean;

  /**
   * A checkbox's state can be controlled.
   * @defaultvalue false
   */
  checked?: 'mixed' | boolean;

  /**
   * Whether the checkbox should be rendered as checked by default.
   */
  defaultChecked?: 'mixed' | boolean;

  /**
   * Checkbox supports two different checkbox sizes.
   * @defaultvalue 'medium'
   */
  size?: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before (start) or after (end) the checkbox.
   * @defaultvalue 'end'
   */
  labelPosition?: 'start' | 'end';

  /**
   * ID of the root element that wraps the checkbox and label.
   */
  rootId?: string;

  /**
   * ID of the native element that represents the checkbox.
   */
  id?: string;

  /**
   * Callback to be called when the checked state value changes.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, data?: CheckboxOnChangeData) => void;
}
/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked?: 'mixed' | boolean;
}

/**
 * Names of the shorthand properties in CheckboxProps
 */
export type CheckboxShorthandProps = 'children';

/**
 * Names of CheckboxProps that have a default value in useCheckbox
 */
export type CheckboxDefaultedProps = 'children' | 'size' | 'labelPosition' | 'checked' | 'checkmarkIcon' | 'mixedIcon';

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState extends ComponentState<CheckboxProps, CheckboxShorthandProps, CheckboxDefaultedProps> {
  /**
   * Ref to the root element.
   */
  ref: React.Ref<HTMLElement>;

  /**
   * CSS class for the icon element.
   */
  iconClassName?: string;

  /**
   * CSS class for the checkbox element.
   */
  checkboxClassName?: string;

  /**
   * Props to be applied to the input element.
   */
  inputProps?: InputProps;

  focused?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Ref to the input element.
   */
  ref: React.Ref<HTMLInputElement>;

  /**
   * ID for the input.
   */
  id?: string;

  /**
   * CSS class for the input element.
   */
  className?: string;

  /**
   * onChange event to be used for the input element.
   */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
}
