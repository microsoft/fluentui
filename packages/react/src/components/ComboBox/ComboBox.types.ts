import * as React from 'react';
import type { IIconProps } from '../../Icon';
import type { ISelectableOption, ISelectableDroppableTextProps } from '../../SelectableOption';
import type { IStyle, ITheme } from '../../Styling';
import type { IButtonStyles, IButtonProps } from '../../Button';
import type { IRefObject, IRenderFunction } from '../../Utilities';
import type { IComboBoxClassNames } from './ComboBox.classNames';
import type { IAutofillProps } from '../../Autofill';

/**
 * {@docCategory ComboBox}
 */
export interface IComboBox {
  /**
   * All selected options.
   */
  readonly selectedOptions: IComboBoxOption[];

  /**
   * If there is a menu open, this will dismiss it.
   */
  dismissMenu: () => void;

  /**
   * Sets focus to the input in the ComboBox.
   * @param shouldOpenOnFocus - Whether to open the menu when the input gets focus
   * @param useFocusAsync - Whether to focus the input asynchronously
   */
  focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): void;
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
export interface IComboBoxProps
  extends ISelectableDroppableTextProps<IComboBox, IComboBox>,
    React.RefAttributes<HTMLDivElement> {
  /**
   * Optional ref to access the `IComboBox` interface. Use this instead of `ref` for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IComboBox>;

  /**
   * Collection of options for this ComboBox.
   */
  options: IComboBoxOption[];

  /**
   * Called when a ComboBox item is clicked.
   */
  onItemClick?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;

  /**
   * Called when either:
   * 1) The selected option changes.
   * 2) A manually edited value is submitted. In this case there may not be a matched option if `allowFreeform`
   *    is also true (and hence only `value` would be provided; the other parameters would be unspecified).
   *
   * The value passed to the callback (4th paramenter) reflects the changed option's text, or the user-typed input when
   * freeform is allowed.
   */
  onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Called when the user changes the pending value in ComboBox, either by typing in the
   * input or hovering over options. When typing, the behavior varies depending on `autoComplete`
   * and `allowFreeform` settings.
   *
   * In all cases, when the pending value is reset, all parameters will be undefined.
   *
   * When hovering options: `option` and `index` will be provided, and `value` will be undefined.
   *
   * Typing with `allowFreeform` on: If there's an option matching the input (an exact match if
   * `autoComplete` is off, or a prefix match otherwise), `option` and `index` are provided and
   * `value` is undefined. Otherwise only `value` is provided.
   *
   * Typing with `allowFreeform` off (or unspecified): If `autoComplete` is on (or unspecified),
   * and the user types text matching the start of an option within a timeout, `option` and `index`
   * are provided and `value` is undefined. If `autoComplete` is off, typing does nothing.
   *
   * If you simply want to be notified of raw text input, use the prop `onInputValueChange`.
   */
  onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Called when the user types in to the input of the combo box
   *
   * Ideal if you want to be notified of raw text input
   */
  onInputValueChange?: (text: string) => void;

  /**
   * Called when the ComboBox menu is launched.
   */
  onMenuOpen?: () => void;

  /**
   * Called when the ComboBox menu is dismissed.
   */
  onMenuDismissed?: () => void;

  /**
   * Called before the menu gets dismissed.
   */
  onMenuDismiss?: () => void;

  /**
   * Called when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time.
   */
  onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;

  /**
   * Called when the ComboBox requests the list to scroll to a specific element.
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
   * Value to show in the input. Does not have to map to an option.
   */
  text?: string;

  /**
   * When multiple items are selected, this will be used to separate values in the ComboBox input.
   *
   * @defaultvalue ", "
   */
  multiSelectDelimiter?: string;

  /**
   * The IconProps to use for the caret down (expand) button of the ComboBox.
   */
  buttonIconProps?: IIconProps;

  /**
   * Props to pass through to the Autofill component (the input field) inside the ComboBox.
   * WARNING: These props (except the callbacks) may override ComboBox's defaults and cause issues.
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
   * Styles for the caret down (expand) button.
   */
  caretDownButtonStyles?: Partial<IButtonStyles>;

  /**
   * Default styles that should be applied to ComboBox options.
   */
  comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;

  /**
   * If the options list is scrollable, whether to position the selected option at the top of the
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
   * Mutually exclusive with `dropdownWidth`.
   */
  useComboBoxAsMenuWidth?: boolean;

  /**
   * Custom max width for the options list dropdown.
   */
  dropdownMaxWidth?: number;

  /**
   * Whether to hide the ComboBox's caret (expand) button element from screen readers. This is true
   * (hidden) by default because all functionality is handled by the input element, and the arrow
   * button is only meant to be decorative.
   * @defaultvalue true
   */
  isButtonAriaHidden?: boolean;

  /**
   * Optional ID of an element providing a description of the ComboBox for screen reader users.
   */
  ariaDescribedBy?: string;

  /**
   * Whether to show/hide the menu when it's opened/closed (rather than creating/destroying it).
   * This will improve perf of the menu opening but could potentially have a negative impact on
   * overall perf by increasing initial render time (since the ComboBox will render the menu hidden
   * on mount) and keeping more elements in the DOM. Should only be used when perf to open/close
   * the menu is important.
   *
   * Note: This may increase the amount of time it takes for the ComboBox itself to mount.
   */
  persistMenu?: boolean;

  /**
   * Whether the options list callout should restore focus after being dismissed. Set to false to
   * prevent the menu from trying to re-focus the element that had focus before the menu was opened.
   * @defaultvalue true;
   */
  shouldRestoreFocus?: boolean;

  /**
   * Additional props for the caret down (expand) button.
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
