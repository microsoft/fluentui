import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

/**
 * TODO:
 *  - Remove as from Omit. Currently it's needed since checkbox Commons shouldn't have as.
 *  - Instead of extending LabelProps, extend LabelCommons once it's added.
 */
export interface CheckboxCommons extends Omit<LabelProps, 'defaultChecked' | 'onChange' | 'as'> {
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
  size: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before or after the checkbox.
   * @defaultvalue 'after'
   */
  labelPosition: 'before' | 'after';

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
 * Checkbox Props
 */
export interface CheckboxProps extends ComponentPropsCompat, Partial<CheckboxCommons> {
  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input?: ShorthandPropsCompat<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;

  /**
   * Renders the checkbox, with the checkmark icon as its child when checked.
   */
  indicator?: ShorthandPropsCompat<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState
  extends ComponentStateCompat<CheckboxProps, 'input' | 'indicator', 'size' | 'labelPosition' | 'input' | 'indicator'> {
  /**
   * Ref to the root element.
   */
  ref: React.Ref<HTMLElement>;

  /**
   * CSS class for the container of the input element and indicator slot.
   */
  containerClassName?: string;
}
