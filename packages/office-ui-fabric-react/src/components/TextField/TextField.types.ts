import * as React from 'react';
import { IStyle, IStyleSet, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IIconProps } from '../../Icon';

/**
 * {@docCategory TextField}
 */
export interface ITextField {
  /** Gets the current value of the input. */
  value: string | undefined;

  /** Sets focus to the input. */
  focus: () => void;

  /** Blurs the input */
  blur: () => void;

  /** Select the value of the text field. */
  select: () => void;

  /** Sets the selection start of the text field to a specified value. */
  setSelectionStart: (value: number) => void;

  /** Sets the selection end of the text field to a specified value. */
  setSelectionEnd: (value: number) => void;

  /**
   * Sets the start and end positions of a selection in a text field.
   * Call with start and end set to the same value to set the cursor position.
   * @param start - Index of the start of the selection.
   * @param end - Index of the end of the selection.
   */
  setSelectionRange: (start: number, end: number) => void;

  /** Gets the selection start of the text field. Returns -1 if there is no selection. */
  selectionStart: number | null;

  /** Gets the selection end of the text field. Returns -1 if there is no selection. */
  selectionEnd: number | null;
}

/**
 * TextField component props.
 * {@docCategory TextField}
 */
export interface ITextFieldProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * Optional callback to access the ITextField component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITextField>;

  /**
   * Whether or not the text field is a multiline text field.
   * @defaultvalue false
   */
  multiline?: boolean;

  /**
   * For multiline text fields, whether or not the field is resizable.
   * @defaultvalue true
   */
  resizable?: boolean;

  /**
   * For multiline text fields, whether or not to auto adjust text field height.
   * @defaultvalue false
   */
  autoAdjustHeight?: boolean;

  /**
   * Whether or not the text field is underlined.
   * @defaultvalue false
   */
  underlined?: boolean;

  /**
   * Whether or not the text field is borderless.
   * @defaultvalue false
   */
  borderless?: boolean;

  /**
   * Label displayed above the text field (and read by screen readers).
   */
  label?: string;

  /**
   * Custom renderer for the label.
   * If you don't call defaultRender, ensure that you give your custom-rendered label an id and that
   * you set the textfield's aria-labelledby prop to that id.
   */
  onRenderLabel?: IRenderFunction<ITextFieldProps>;

  /**
   * Description displayed below the text field to provide additional details about what text to enter.
   */
  description?: string;

  /**
   * Custom renderer for the description.
   */
  onRenderDescription?: IRenderFunction<ITextFieldProps>;

  /**
   * Prefix displayed before the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the prefix.
   */
  prefix?: string;

  /**
   * Suffix displayed after the text field contents. This is not included in the value.
   * Ensure a descriptive label is present to assist screen readers, as the value does not include the suffix.
   */
  suffix?: string;

  /**
   * Custom render function for prefix.
   */
  onRenderPrefix?: IRenderFunction<ITextFieldProps>;

  /**
   * Custom render function for suffix.
   */
  onRenderSuffix?: IRenderFunction<ITextFieldProps>;

  /**
   * Props for an optional icon, displayed in the far right end of the text field.
   */
  iconProps?: IIconProps;

  /**
   * Default value of the text field. Only provide this if the text field is an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue?: string;

  /**
   * Current value of the text field. Only provide this if the text field is a controlled component where you
   * are maintaining its current state; otherwise, use the `defaultValue` property.
   */
  value?: string;

  /**
   * Disabled state of the text field.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * If true, the text field is readonly.
   * @defaultvalue false
   */
  readOnly?: boolean;

  /**
   * Static error message displayed below the text field. Use `onGetErrorMessage` to dynamically
   * change the error message displayed (if any) based on the current value. `errorMessage` and
   * `onGetErrorMessage` are mutually exclusive (`errorMessage` takes precedence).
   */
  errorMessage?: string | JSX.Element;

  /**
   * Callback for when the input value changes.
   * This is called on both `input` and `change` events.
   * (In a later version, this will probably only be called for the `change` event.)
   */
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;

  /**
   * Function called after validation completes.
   */
  onNotifyValidationResult?: (errorMessage: string | JSX.Element, value: string | undefined) => void;

  /**
   * Function used to determine whether the input value is valid and get an error message if not.
   * Mutually exclusive with the static string `errorMessage` (it will take precedence over this).
   *
   * When it returns `string | JSX.Element`:
   * - If valid, it returns empty string.
   * - If invalid, it returns the error message and the text field will
   *   show a red border and show an error message below the text field.
   *
   * When it returns `Promise<string | JSX.Element>`:
   * - The resolved value is displayed as the error message.
   * - If rejected, the value is thrown away.
   */
  onGetErrorMessage?: (value: string) => string | JSX.Element | PromiseLike<string | JSX.Element> | undefined;

  /**
   * Text field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Updates to this prop will not be respected.
   * @defaultvalue 200
   */
  deferredValidationTime?: number;

  /**
   * Optional class name that is added to the container of the component.
   */
  className?: string;

  /**
   * Optional class name that is added specifically to the input/textarea element.
   */
  inputClassName?: string;

  /**
   * Aria label for the text field.
   */
  ariaLabel?: string;

  /**
   * Run validation when focus moves into the input, and **do not** validate on change.
   *
   * (Unless this prop and/or `validateOnFocusOut` is set to true, validation will run on every change.)
   * @defaultvalue false
   */
  validateOnFocusIn?: boolean;

  /**
   * Run validation when focus moves out of the input, and **do not** validate on change.
   *
   * (Unless this prop and/or `validateOnFocusIn` is set to true, validation will run on every change.)
   * @defaultvalue false
   */
  validateOnFocusOut?: boolean;

  /**
   * Whether validation should run when the input is initially rendered.
   * @defaultvalue true
   */
  validateOnLoad?: boolean;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;

  /**
   * Whether the input field should have autocomplete enabled.
   * This tells the browser to display options based on earlier typed values.
   * Common values are 'on' and 'off' but for all possible values see the following links:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete?: string;

  /**
   * Only used by MaskedTextField:
   * The masking string that defines the mask's behavior.
   * A backslash will escape any character.
   * Special format characters are:
   * '9': [0-9]
   * 'a': [a-zA-Z]
   * '*': [a-zA-Z0-9]
   *
   * @example `Phone Number: (999) 999-9999`
   */
  mask?: string;

  /**
   * Only used by MaskedTextField:
   * The character to show in place of unfilled characters of the mask.
   * @defaultvalue '_'
   */
  maskChar?: string;

  /**
   * Only used by MaskedTextField:
   * An object defining the format characters and corresponding regexp values.
   * Default format characters: \{
   *  '9': /[0-9]/,
   *  'a': /[a-zA-Z]/,
   *  '*': /[a-zA-Z0-9]/
   * \}
   */
  maskFormat?: { [key: string]: RegExp };
}

/**
 * {@docCategory TextField}
 */
export type ITextFieldStyleProps = Required<Pick<ITextFieldProps, 'theme'>> &
  Pick<
    ITextFieldProps,
    'className' | 'disabled' | 'inputClassName' | 'required' | 'multiline' | 'borderless' | 'resizable' | 'underlined' | 'autoAdjustHeight'
  > & {
    /** Element has an error message. */
    hasErrorMessage?: boolean;
    /** Element has an icon. */
    hasIcon?: boolean;
    /** Element has a label. */
    hasLabel?: boolean;
    /** Element has focus. */
    focused?: boolean;
  };

/**
 * {@docCategory TextField}
 */
export interface ITextFieldSubComponentStyles {
  /**
   * Styling for Label child component.
   */
  // TODO: this should be the interface once we're on TS 2.9.2 but otherwise causes errors in 2.8.4
  // label: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
  label: IStyleFunctionOrObject<any, any>;
}

/**
 * {@docCategory TextField}
 */
export interface ITextFieldStyles extends IStyleSet<ITextFieldStyles> {
  /**
   * Style for root element.
   */
  root: IStyle;

  /**
   * Style for field group encompassing entry area (prefix, field, icon and suffix).
   */
  fieldGroup: IStyle;

  /**
   * Style for prefix element.
   */
  prefix: IStyle;

  /**
   * Style for suffix element.
   */
  suffix: IStyle;

  /**
   * Style for main field entry element.
   */
  field: IStyle;

  /**
   * Style for icon prop element.
   */
  icon: IStyle;

  /**
   * Style for description element.
   */
  description: IStyle;

  /**
   * Style for TextField wrapper element.
   */
  wrapper: IStyle;

  /**
   * Style for error message element.
   */
  errorMessage: IStyle;

  /**
   * Styling for subcomponents.
   */
  subComponentStyles: ITextFieldSubComponentStyles;
}
