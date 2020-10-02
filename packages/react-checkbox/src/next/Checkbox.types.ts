import * as React from 'react';
import { BaseSlots, SlotProp, SlotProps } from '@fluentui/react-compose';
import { ISvgIconProps } from '@fluentui/react-icons';
import { IStyle, ITheme } from '@uifabric/styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '@uifabric/utilities';
import { IKeytipProps } from '@fluentui/react-internal/lib/Keytip';

/* eslint-disable @typescript-eslint/naming-convention */

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
export interface ICheckboxProps
  extends React.ButtonHTMLAttributes<HTMLElement | HTMLInputElement>,
    React.RefAttributes<HTMLElement> {
  /**
   * Render the root element as another type.
   */
  as?: React.ElementType;

  /**
   * Optional callback to access the ICheckbox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICheckbox>;

  /**
   * Label to display next to the checkbox.
   */
  label?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Checkmark Icon to display when checkbox is checked.
   */
  checkmark?: SlotProp<ISvgIconProps>;

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
  inputProps?: React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;

  /**
   * Allows you to set the checkbox to be at the before (start) or after (end) the label.
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
   * The position in the parent set (if in a set) for aria-posinset.
   */
  ariaPositionInSet?: number;

  /**
   * The total size of the parent set (if in a set) for aria-setsize.
   */
  ariaSetSize?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   *
   * @deprecated This no longer works. TODO: fix use cases with tokens prop.
   */
  styles?: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;

  /**
   * Custom render function for the label.
   *
   * @deprecated Use label prop instead.
   */
  onRenderLabel?: IRenderFunction<ICheckboxProps>;

  /**
   * Optional keytip.
   *
   * @deprecated This no longer works. Use `useKeytipData` hook instead.
   */
  keytipProps?: IKeytipProps;

  /**
   * Optional controlled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
   * over checked or defaultChecked props given but does not affect checked state.
   * This should not be a toggleable state. On load the checkbox will receive indeterminate visual state
   * and after the first user click it should be removed by your supplied onChange callback
   * function exposing the true state of the checkbox.
   */
  indeterminate?: boolean;

  /**
   * Optional uncontrolled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
   * over checked or defaultChecked props given but does not affect checked state.
   * This is not a toggleable state. On load the checkbox will receive indeterminate visual state
   * and after the user's first click it will be removed exposing the true state of the checkbox.
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
   * This refers to the <input type="checkbox"> element that is typically hidden and not rendered on screen.
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

/**
 * {@docCategory Checkbox}
 */
export interface ICheckboxSlots extends BaseSlots {
  input: React.ElementType;
  container: React.ElementType;
  checkbox: React.ElementType;
  checkmark: React.ElementType;
  label: React.ElementType;
}

/**
 * {@docCategory Checkbox}
 */
export type ICheckboxClasses = { [key in keyof ICheckboxSlots]: string };

/**
 * {@docCategory Checkbox}
 */
export type ICheckboxSlotProps = SlotProps<ICheckboxSlots, ICheckboxProps, React.HTMLAttributes<HTMLDivElement>>;

export interface ICheckboxState extends Omit<ICheckboxProps, keyof ICheckboxSlotProps>, Partial<ICheckboxSlotProps> {
  ref: React.Ref<HTMLElement>;
}
