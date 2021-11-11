import * as React from 'react';
import { IIconProps } from '../../Icon';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';
import { ISelectableDroppableTextProps } from '../../utilities/selectableOption/SelectableDroppableText.types';
import { IStyle, ITheme } from '../../Styling';
import { IButtonStyles } from '../../Button';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { IAutofillProps } from '../pickers/AutoFill/BaseAutoFill.types';
import { IButtonProps } from '../Button/Button.types';

/**
 * {@docCategory ComboBox}
 */
export interface IComboBox {
  /**
   * All selected options.
   */
  readonly selectedOptions: IComboBoxOption[];

  /**
   * If there is a menu open this will dismiss the menu.
   */
  dismissMenu: () => void;

  /**
   * Sets focus to the input in the ComboBox
   * @param shouldOpenOnFocus - Determines if we should open the ComboBox menu when the input gets focus.
   * @param useFocusAsync - Determines if we should focus the input asynchronously.
   * @returns True if focus could be set, false if no operation was taken.
   */
  focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxOption extends ISelectableOption {
  /**
   * Specific styles for each ComboBox option. To give common styles to all options, use
   * `IComboBoxProps.comboBoxOptionStyles` instead.
   */
  styles?: Partial<IComboBoxOptionStyles>;

  /**
   * Whether to use the `ariaLabel` prop instead of the `text` prop to set the preview text as well
   * as the `aria-label`. This is for scenarios where the `text` prop is used for embedded data.
   */
  useAriaLabelAsText?: boolean;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBox, IComboBox> {
  /**
   * Optional callback to access the `IComboBox` interface. Use this instead of `ref` for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IComboBox>;

  /**
   * Collection of options for this ComboBox.
   */
  options: IComboBoxOption[];

  /**
   * Callback for when a ComboBox item is clicked.
   */
  onItemClick?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;

  /**
   * Callback for when either:
   * 1) The selected option changes.
   * 2) A manually edited value is submitted. In this case there may not be a matched option if `allowFreeform`
   *    is also true (and hence only `value` would be provided; the other parameters would be unspecified).
   */
  onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Callback for when the user changes the pending value in ComboBox.
   * This will be called any time the component is updated and there is a current
   * pending value. Option, index, and value will all be undefined if no change
   * has taken place and the previously entered pending value is still valid.
   */
  onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Callback for when the ComboBox menu is launched.
   */
  onMenuOpen?: () => void;

  /**
   * Callback for when the ComboBox menu is dismissed.
   */
  onMenuDismissed?: () => void;

  /**
   * Callback for before the menu gets dismissed.
   */
  onMenuDismiss?: () => void;

  /**
   * Callback for when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time.
   */
  onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;

  /**
   * Callback for when the ComboBox requests the list to scroll to a specific element.
   */
  onScrollToItem?: (itemIndex: number) => void;

  /**
   * Whether the ComboBox allows freeform user input, rather than restricting to the provided options.
   */
  allowFreeform?: boolean;

  /**
   * Whether the ComboBox auto completes. As the user is entering text, potential matches will be
   * suggested from the list of options. If the ComboBox is expanded, this will also scroll to the
   * suggested option and give it a selected style.
   *
   * @defaultvalue "on"
   */
  autoComplete?: 'on' | 'off';

  /**
   * Value to show in the input (does not have to map to a ComboBox option).
   */
  text?: string;

  /**
   * When multiple items are selected, this will be used to separate values in the ComboBox input.
   *
   * @defaultvalue ", "
   */
  multiSelectDelimiter?: string;

  /**
   * The IconProps to use for the caret button of the ComboBox.
   */
  buttonIconProps?: IIconProps;

  /**
   * Props to pass through to the Autofill component (the input field) inside the ComboBox.
   */
  autofill?: IAutofillProps;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Custom styles for this component.
   */
  styles?: Partial<IComboBoxStyles>;

  /**
   * Custom function for providing the classNames for the ComboBox. Can be used to provide
   * all styles for the component instead of applying them on top of the default styles.
   */
  getClassNames?: (
    theme: ITheme,
    isOpen: boolean,
    disabled: boolean,
    required: boolean,
    focused: boolean,
    allowFreeForm: boolean,
    hasErrorMessage: boolean,
    className?: string,
  ) => IComboBoxClassNames;

  /**
   * Styles for the caret down button.
   */
  caretDownButtonStyles?: Partial<IButtonStyles>;

  /**
   * Default styles that should be applied to ComboBox options.
   */
  comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;

  /**
   * When the options list is scrollable, whether to position the selected option at the top of the
   * callout when it is opened (unless it has reached the end of the scrollbar).
   * @defaultvalue false;
   */
  scrollSelectedToTop?: boolean;

  /**
   * Add additional content above the option list in the callout.
   */
  onRenderUpperContent?: IRenderFunction<IComboBoxProps>;

  /**
   * Add additional content below the option list in the callout.
   */
  onRenderLowerContent?: IRenderFunction<IComboBoxProps>;

  /**
   * Custom width for options list dropdown. Mutually exclusive with `useComboBoxAsMenuWidth`.
   */
  dropdownWidth?: number;

  /**
   * Whether to use the ComboBox field width as the menu's width.
   */
  useComboBoxAsMenuWidth?: boolean;

  /**
   * Custom max width for the options list dropdown.
   */
  dropdownMaxWidth?: number;

  /**
   * Sets the `aria-hidden` attribute on the ComboBox's caret button element. This element is hidden
   * from screen readers by default because all functionality is handled by the input element and
   * the arrow button is only meant to be decorative.
   * @defaultvalue true
   */
  isButtonAriaHidden?: boolean;

  /**
   * Optional ID of an element providing a description of the ComboBox for screen reader users.
   */
  ariaDescribedBy?: string;

  /**
   * Optional keytip for this ComboBox.
   */
  keytipProps?: IKeytipProps;

  /**
   * Whether to show/hide the menu when it's opened/closed (rather than creating/destroying it).
   * This will improve perf of the menu opening but could potentially have a negative impact on
   * overall perf by increasing initial render time (since the ComboBox will render the menu hidden
   * on mount) and keeping more elements in the DOM. Should only be used when perf to open/close
   * the menu is important.
   */
  persistMenu?: boolean;

  /**
   * Whether the options list callout should restore focus after being dismissed. Set to false to
   * prevent the menu from trying to re-focus the element that had focus before the menu was opened.
   * @defaultvalue true;
   */
  shouldRestoreFocus?: boolean;

  /**
   * Additional props for the caret button.
   */
  iconButtonProps?: IButtonProps;

  /**
   * Custom render function for the label text.
   */
  onRenderLabel?: IRenderFunction<IOnRenderComboBoxLabelProps>;
}

/**
 * {@docCategory ComboBox}
 */
export interface IOnRenderComboBoxLabelProps {
  /**
   * Props to render the ComboBox.
   */
  props: IComboBoxProps;

  /**
   * Accessible text for label when ComboBox is multiselected.
   */
  multiselectAccessibleText?: string;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxStyles {
  /**
   * Style for the container which has the ComboBox and the label.
   * (In most other components this would be called `root`.)
   */
  container: IStyle;

  /**
   * Style for the label element of the ComboBox.
   */
  label: IStyle;

  /**
   * Style for the label element of the ComboBox in the disabled state.
   */
  labelDisabled: IStyle;

  /**
   * Base styles for the wrapper element containing the input field and caret button, applied to
   * all state variants.
   *
   * Unlike in most components, this is NOT the actual root element which also contains the label
   * as well as the field; for that, use `container`.
   */
  root: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied when
   * the ComboBox has an error message.
   */
  rootError: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied when
   * `IComboBoxProps.allowFreeform` is false.
   */
  rootDisallowFreeForm: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied any time
   * the ComboBox is hovered (unless it's disabled).
   */
  rootHovered: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied any time
   * the ComboBox is active (unless it's disabled).
   */
  rootPressed: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied any time
   * the ComboBox is focused (unless it's disabled).
   */
  rootFocused: IStyle;

  /**
   * Styles for the wrapper element containing the input field and caret button, applied when the
   * ComboBox is disabled. These override all the other styles.
   *
   * NOTE: Hover/focused/active styles are not applied for disabled ComboBoxes.
   */
  rootDisabled: IStyle;

  /**
   * Base styles for the input element which contains the currently selected option.
   */
  input: IStyle;

  /**
   * Style override for the input element when ComboBox is disabled.
   */
  inputDisabled: IStyle;

  /**
   * Styles for the error message text of the ComboBox.
   */
  errorMessage: IStyle;

  /**
   * Styles for the callout.
   */
  callout: IStyle;

  /**
   * Styles for the options list container element.
   */
  optionsContainerWrapper: IStyle;

  /**
   * Styles for the container of all the ComboBox options.
   * Includes the headers and dividers.
   */
  optionsContainer: IStyle;

  /**
   * Styles for a header in the options.
   */
  header: IStyle;

  /**
   * Styles for a divider in the options.
   */
  divider: IStyle;

  /**
   * Styles for hidden screen reader text.
   */
  screenReaderText: IStyle;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxOptionStyles extends IButtonStyles {
  /**
   * Styles for the text inside the ComboBox option. This should be used instead of the description
   * in IButtonStyles because we custom render the text in the ComboBox options.
   */
  optionText: IStyle;

  /**
   * Styles for the ComboBox option text's wrapper.
   */
  optionTextWrapper: IStyle;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxClassNames {
  container: string;
  label: string;
  root: string;
  input: string;
  errorMessage: string;
  callout: string;
  optionsContainer: string;
  header: string;
  divider: string;
  optionsContainerWrapper: string;
  screenReaderText: string;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxOptionClassNames {
  optionText: string;
  root: string;
  optionTextWrapper: string;
}
