import * as React from 'react';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '@fluentui/utilities';
import type { IIconProps } from '../Icon/Icon.types';

/**
 * Checkbox class interface.
 * {@docCategory Checkbox}
 */
export interface ICheckbox {
  /** Gets the current indeterminate state. */
  indeterminate: boolean;

  /** Gets the current checked state. */
  checked: boolean;

  /** Sets focus to the checkbox. */
  focus: () => void;
}

/**
 * Checkbox properties.
 * {@docCategory Checkbox}
 */
export interface ICheckboxProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the `ICheckbox` interface. Use this instead of `ref` for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICheckbox>;

  /**
   * Class name to provide on the root element, in addition to the `ms-Checkbox` class.
   */
  className?: string;

  /**
   * Checked state. Mutually exclusive with `defaultChecked`. Use this if you control the checked state at a higher
   * level and plan to pass in the correct value based on handling `onChange` events and re-rendering.
   */
  checked?: boolean;

  /**
   * Default checked state. Mutually exclusive with `checked`. Use this if you want an uncontrolled component,
   * meaning the Checkbox instance maintains its own state.
   */
  defaultChecked?: boolean;

  /**
   * Label to display next to the checkbox.
   */
  label?: string;

  /**
   * Disabled state of the checkbox.
   */
  disabled?: boolean;

  /**
   * Required state of the checkbox.
   */
  required?: boolean;

  /**
   * Callback that is called when the checked value has changed.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;

  /**
   * Title text applied to the root element and the hidden checkbox input.
   * (Use `label` instead for the visible label.)
   */
  title?: string;

  /**
   * ID for the checkbox input.
   */
  id?: string;

  /**
   * Name for the checkbox input. This is intended for use with forms and NOT displayed in the UI.
   */
  name?: string;

  /**
   * Optional props that will be applied to the input element, *before* other props are applied.
   * Note that if you provide, for example, `disabled` as well as `inputProps.disabled`, the
   * top-level prop (`disabled` in this case) will take precedence.
   *
   * Including `data-*` props in `inputProps` is supported but currently requires casting since
   * TS 3.7 doesn't provide a way to allow all keys with a certain prefix.
   */
  inputProps?: React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;

  /**
   * Determines whether the checkbox should be shown before the label (`start`) or after (`end`).
   * @defaultvalue 'start'
   */
  boxSide?: 'start' | 'end';

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Accessible label for the checkbox.
   */
  ariaLabel?: string;

  /**
   * ID for element that contains label information for the checkbox.
   */
  ariaLabelledBy?: string;

  /**
   * ID for element that provides extended information for the checkbox.
   */
  ariaDescribedBy?: string;

  /**
   * The position in the parent set (if in a set) for `aria-posinset`.
   */
  ariaPositionInSet?: number;

  /**
   * The total size of the parent set (if in a set) for `aria-setsize`.
   */
  ariaSetSize?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;

  /**
   * Custom render function for the label.
   */
  onRenderLabel?: IRenderFunction<ICheckboxProps>;

  /**
   * Custom icon props for the check mark rendered by the checkbox
   */
  checkmarkIconProps?: IIconProps;

  /**
   * Optional controlled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
   * over `checked` or `defaultChecked` props given but does not affect checked state.
   *
   * This should not be a toggleable state. On load, the checkbox will receive indeterminate visual state.
   * After the first user click, your supplied `onChange` callback should remove the indeterminate state
   * (without modifying the checked state), exposing the true state of the checkbox.
   */
  indeterminate?: boolean;

  /**
   * Optional uncontrolled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
   * over `checked` or `defaultChecked` props given but does not affect checked state.
   *
   * This should not be a toggleable state. On load, the checkbox will receive indeterminate visual state.
   * After the user's first click, it will be removed, exposing the true state of the checkbox.
   */
  defaultIndeterminate?: boolean;
}

/**
 * {@docCategory Checkbox}
 */
export interface ICheckboxStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  reversed?: boolean;
  indeterminate?: boolean;
  isUsingCustomLabelRender: boolean;
}

/**
 * {@docCategory Checkbox}
 */
export interface ICheckboxStyles {
  /**
   * Style for the root element (a button) of the checkbox component in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * INTERNAL: This is mostly an internal implementation detail which you should avoid styling.
   * This refers to the `<input type="checkbox">` element that is typically hidden and not rendered on screen.
   */
  input?: IStyle;

  /**
   * Style for the label part (contains the customized checkbox + text) when enabled.
   */
  label?: IStyle;

  /**
   * Style for checkbox in its default unchecked/enabled state.
   */
  checkbox?: IStyle;

  /**
   * Style for the checkmark in the default enabled/unchecked state.
   */
  checkmark?: IStyle;

  /**
   * Style for text appearing with the checkbox in its default enabled state.
   */
  text?: IStyle;
}
