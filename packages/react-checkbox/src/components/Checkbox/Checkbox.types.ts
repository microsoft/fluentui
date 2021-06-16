import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

/**
 * Checkbox Props
 */
export interface CheckboxProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Label to be rendered with the checkbox.
   */
  label?: string | ShorthandProps<LabelProps>;

  /**
   * Icon to be displayed when the checkbox is in the checked state.
   */
  icon?: React.ReactElement;

  /**
   * Disabled state of the checkbox.
   */
  disabled?: boolean;

  /**
   * A checkbox can be rendered with a circular shape.
   */
  circular?: boolean;

  /**
   * A checkbox's state can be controlled.
   * @defaultvalue false
   */
  checked?: 'indeterminate' | boolean;

  /**
   * Whether the checkbox should be rendered as checked by default.
   */
  defaultChecked?: boolean;

  /**
   * Whether the checkbox should be rendered as indeterminate by default.
   */
  defaultIndeterminate?: boolean;

  /**
   * Checkbox supports two different checkbox sizes, see tokens for reference.
   * @defaultvalue 'medium'
   */
  size?: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before (start) or after (end) the checkbox.
   * @defaultvalue 'end'
   */
  labelPosition?: 'start' | 'end';

  /**
   * ID for the root div, this will be the ID of the Checkbox component.
   */
  rootId?: string;

  /**
   * Callback to be called when the checked state value changes.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: 'indeterminate' | boolean) => void;
}

/**
 * Names of the shorthand properties in CheckboxProps
 */
export type CheckboxShorthandProps = 'label';

/**
 * Names of CheckboxProps that have a default value in useCheckbox
 */
export type CheckboxDefaultedProps = 'label' | 'size' | 'labelPosition' | 'checked' | 'icon';

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState extends ComponentState<CheckboxProps, CheckboxShorthandProps, CheckboxDefaultedProps> {
  /**
   * Ref to the root element.
   */
  ref: React.Ref<HTMLElement>;

  /**
   * Ref to the input element.
   */
  inputRef: React.Ref<HTMLInputElement>;

  /**
   * ID for the input.
   */
  inputId?: string;

  /**
   * CSS class for the icon element.
   */
  iconClassName?: string;

  /**
   * CSS class for the input element.
   */
  inputClassName?: string;

  /**
   * CSS class for the checkbox element.
   */
  checkboxClassName?: string;

  /**
   * onChange event to be used for the input element.
   */
  inputOnChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
}
