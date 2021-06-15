import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

export interface InputProps extends HTMLInputElement {
  onChange?: React.ChangeEvent<HTMLElement>;

  ariaChecked: React.AriaAttributes['aria-checked'];
}

/**
 * Checkbox Props
 */
export interface CheckboxProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the checkboxShorthandProps array below
   * Any property that has a default value should be listed in CheckboxDefaultedProps as e.g. 'size' | 'icon'
   */

  label?: string | ShorthandProps<LabelProps>;

  checkbox?: ShorthandProps<HTMLDivElement>;

  size?: 'medium' | 'large';

  labelPosition?: 'start' | 'end';

  checked?: boolean;

  defaultChecked?: boolean;

  indeterminate?: boolean;

  defaultIndeterminate?: boolean;

  circular?: boolean;
}

/**
 * Names of the shorthand properties in CheckboxProps
 */
export type CheckboxShorthandProps = 'label'; // TODO add shorthand property names

/**
 * Names of CheckboxProps that have a default value in useCheckbox
 */
export type CheckboxDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState extends ComponentState<CheckboxProps, CheckboxShorthandProps, CheckboxDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;

  inputRef: React.Ref<HTMLInputElement>;

  inputClassName?: string;

  checkboxClassName?: string;

  iconClassName?: string;

  inputId?: string;

  inputOnChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
}
