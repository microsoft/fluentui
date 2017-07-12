import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';

/**
 * Checkbox class interface.
 */
export interface ICheckbox {
  /** Gets the current checked state. */
  checked: boolean;

  /** Sets focus to the checkbox. */
  focus: () => void;
}

/**
 * Checkbox properties.
 */
export interface ICheckboxProps extends React.HTMLAttributes<HTMLElement | HTMLInputElement> {
  /**
   * Optional callback to access the ICheckbox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICheckbox) => void;

  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;

  /**
   * Checked state. Mutually exclusive to "defaultChecked". Use this if you control the checked state at a higher
   * level and plan to pass in the correct value based on handling onChange events and re-rendering.
   */
  checked?: boolean;

  /**
   * Default checked state. Mutually exclusive to "checked". Use this if you want an uncontrolled component, and
   * want the Checkbox instance to maintain its own state.
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
   * Callback that is called when the checked value has changed.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;

  /**
   * Optional input props that will be mixed into the input element, *before* other props are applied. This allows
   * you to extend the input element with additional attributes, such as data-automation-id needed for automation.
   * Note that if you provide, for example, "disabled" as well as "inputProps.disabled", the former will take
   * precedence over the later.
   */
  inputProps?: React.HTMLAttributes<HTMLElement | HTMLInputElement>;

  /**
   * Allows you to set the checkbox to be at the before (start) or after (end) the label.
   * @default 'start'
   */
  boxSide?: 'start' | 'end';

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Custom styles for this component
   */
  styles?: ICheckboxStyles;
}

export interface ICheckboxStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * Style for the text before/after the checkbox input element.
   */
  label?: IStyle;

  labelReversed?: IStyle;

  labelDisabled?: IStyle;

  /**
   *
   */
  input?: IStyle;
  /**
 *
 */
  checkboxHovered?: IStyle;

  /**
   *
   */
  checkboxChecked?: IStyle;

  /**
   *
   */
  checkboxCheckedHovered?: IStyle;

  /**
   *
   */
  checkboxDisabled?: IStyle;

  /**
   *
   */
  checkboxCheckedDisabled?: IStyle;

  /**
   *
   */
  box?: IStyle;

  /**
   *
   */
  checkbox?: IStyle;

  /**
   *
   */
  checkmark?: IStyle;

  /**
   *
   */
  checkmarkChecked?: IStyle;

  checkmarkDisabled?: IStyle;

  /**
   *
   */
  text?: IStyle;

  textHovered?: IStyle;

  textDisabled?: IStyle;

}