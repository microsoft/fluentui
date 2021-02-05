import * as React from 'react';
import { IIconProps } from '../../Icon';
import { ISelectableOption, ISelectableDroppableTextProps } from '../../SelectableOption';
import { IStyle, ITheme } from '../../Styling';
import { IButtonStyles, IButtonProps } from '../../compat/Button';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { IComboBoxClassNames } from './ComboBox.classNames';
import { IAutofillProps } from '../../Autofill';

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
   * @returns True if focus could be set, false if no operation was taken.
   */
  focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
}

/**
 * {@docCategory ComboBox}
 */
export interface IComboBoxOption extends ISelectableOption {
  /**
   * Specific styles for each ComboBox option.
   * For styles shared between all options, use the prop `comboBoxOptionStyles`.
   */
  styles?: Partial<IComboBoxOptionStyles>;

  /**
   * In scenarios where embedded data is used as the `text` prop, whether to use the `ariaLabel` prop
   * to set the `aria-label` and preview text.
   * @defaultvalue false;
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
   * 1) the selected option changes
   * 2) a manually edited value is submitted. In this case, if `allowFreeform` is true,
   *   it's possible that only `value` will be provided (`option` will be unset).
   */
  onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Callback issued when the user changes the pending value in ComboBox.
   * This will be called any time the component is updated and there is a current
   * pending value. Option, index, and value will all be undefined if no change
   * has taken place and the previously entered pending value is still valid.
   */
  onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;

  /**
   * Function that gets invoked when the ComboBox menu is launched.
   */
  onMenuOpen?: () => void;

  /**
   * Function that gets invoked when the ComboBox menu is dismissed.
   */
  onMenuDismissed?: () => void;

  /**
   * Function that gets invoked before the menu gets dismissed.
   */
  onMenuDismiss?: () => void;

  /**
   * Callback issued when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time.
   */
  onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;

  /**
   * Callback issued when the ComboBox requests the list to scroll to a specific element.
   */
  onScrollToItem?: (itemIndex: number) => void;

  /**
   * Whether the ComboBox is free form, meaning that the user input is not bound to provided options.
   * @default false
   */
  allowFreeform?: boolean;

  /**
   * Whether the ComboBox auto completes. As the user is entering text, it will be suggested potential matches from
   * the list of options. If the ComboBox is expanded, this will also scroll to the suggested option, and give it a
   * selected style.
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
   * The IconProps to use for the button aspect of the ComboBox.
   */
  buttonIconProps?: IIconProps;

  /**
   * Props for the Autofill component (text input) inside the ComboBox.
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
   * If true, when options are scrollable, the selected option is positioned at the top of the callout
   * when it is opened (unless it has reached the end of the scrollbar).
   * @defaultvalue false
   */
  scrollSelectedToTop?: boolean;

  /**
   * Add additional content above the callout list.
   */
  onRenderUpperContent?: IRenderFunction<IComboBoxProps>;

  /**
   * Add additional content below the callout list.
   */
  onRenderLowerContent?: IRenderFunction<IComboBoxProps>;

  /**
   * Custom width for ComboBox menu. Mutually exclusive with `useComboBoxAsMenuWidth`.
   */
  dropdownWidth?: number;

  /**
   * Whether to use the ComboBox's width as the menu's width.
   * Mutually exclusive with `dropdownWidth`.
   */
  useComboBoxAsMenuWidth?: boolean;

  /**
   * Custom max width for dropdown.
   */
  dropdownMaxWidth?: number;

  /**
   * Whether to hide the ComboBox's button element from screen readers. This is true by default because
   * all functionality is handled by the input element, and the arrow button is only meant to be decorative.
   * @defaultvalue true
   */
  isButtonAriaHidden?: boolean;

  /**
   * ID of an element containing a description of the ComboBox for screen reader users.
   */
  ariaDescribedBy?: string;

  /**
   * If true, the menu will be created the first time the ComboBox is rendered, and shown
   * or hidden as appropriate (rather than being created on open and destroyed on close).
   * This will improve perf of the menu opening but could potentially impact overall perf
   * by having more elements in the DOM. Should only be used when perf is important.
   *
   * Note: This may increase the amount of time it takes for the ComboBox itself to mount.
   */
  persistMenu?: boolean;

  /**
   * When specified, determines whether the callout (the menu which drops down) should
   * restore the focus after being dismissed or not. If false, then the menu will not try
   * to set focus to whichever element had focus before the menu was opened.
   * @defaultvalue true
   */
  shouldRestoreFocus?: boolean;

  /**
   * Optional props for the caret down (expand) button.
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
   * Base styles for the root element of the ComboBox in all states.
   */
  root: IStyle;

  /**
   * Styles for the root element for variant of ComboBox with an `errorMessage` in the props.
   */
  rootError: IStyle;

  /**
   * Styles for variant of ComboBox where `allowFreeform` is false in the props.
   */
  rootDisallowFreeForm: IStyle;

  /**
   * Styles for when the ComboBox is hovered. These styles are always applied unless the ComboBox is disabled.
   */
  rootHovered: IStyle;

  /**
   * Styles for when the ComboBox is active. These styles are always applied unless the ComboBox is disabled.
   */
  rootPressed: IStyle;

  /**
   * Styles for when the ComboBox is focused. These styles are always applied unless the ComboBox is disabled.
   */
  rootFocused: IStyle;

  /**
   * Styles for when the ComboBox is disabled. These styles override all the other styles.
   * NOTE: Hover, focused, and active styles are not applied for disabled ComboBoxes.
   */
  rootDisabled: IStyle;

  /**
   * Base styles for the input element, which contains the currently selected option.
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
   * Styles for the options container wrapper.
   */
  optionsContainerWrapper: IStyle;

  /**
   * Styles for the container of all the ComboBox options, including the headers and dividers.
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
   * Styles for the text inside the ComboBox option.
   * This should be used instead of the description
   * inside IButtonStyles because we custom render the option's text.
   */
  optionText: IStyle;

  /**
   * Styles for the ComboBox option text's wrapper.
   */
  optionTextWrapper: IStyle;
}
