import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandProps } from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

/**
 * Checkbox Props
 */
export interface CheckboxProps
  extends Omit<ComponentPropsCompat, 'children'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'defaultChecked' | 'onChange'> {
  /**
   * Label that will be rendered next to the checkbox.
   */
  label?: ShorthandProps<LabelProps>;

  /**
   * Indicator to be rendered as the checkbox icon.
   */
  indicator?: ShorthandProps<ComponentPropsCompat>;

  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input?: ShorthandProps<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;

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
   * Determines whether the label should be positioned before or after the checkbox.
   * @defaultvalue 'after'
   */
  labelPosition?: 'before' | 'after';

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
  onChange?: (ev: React.FormEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void;
}

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked: 'mixed' | boolean;
}

/**
 * Names of the shorthand properties in CheckboxProps
 */
export type CheckboxShorthandProps = 'label' | 'indicator' | 'input';

/**
 * Names of CheckboxProps that have a default value in useCheckbox
 */
export type CheckboxDefaultedProps = 'label' | 'indicator' | 'input' | 'size' | 'labelPosition';

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState
  extends ComponentStateCompat<CheckboxProps, CheckboxShorthandProps, CheckboxDefaultedProps> {
  /**
   * Ref to the root element.
   */
  ref: React.Ref<HTMLElement>;

  /**
   * CSS class for the checkbox element.
   */
  checkboxClassName?: string;
}
