import * as React from 'react';
import { ResponsiveMode } from '../../ResponsiveMode';
import { RectangleEdge } from '../../Positioning';
import type { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle, ITheme } from '../../Styling';
import type { ISelectableOption, ISelectableDroppableTextProps } from '../../SelectableOption';
import type { ICheckboxStyleProps, ICheckboxStyles } from '../../Checkbox';
import type { ILabelStyleProps, ILabelStyles } from '../../Label';
import type { IPanelStyleProps, IPanelStyles } from '../../Panel';

export { SelectableOptionMenuItemType as DropdownMenuItemType } from '../../SelectableOption';

/**
 * {@docCategory Dropdown}
 */
export interface IDropdown {
  /**
   * All selected options
   */
  readonly selectedOptions: IDropdownOption[];

  /**
   * An imperative handle to dismiss the popup if it is open
   */
  dismissMenu: () => void;

  focus: (shouldOpenOnFocus?: boolean) => void;
}

/**
 * {@docCategory Dropdown}
 */
export interface IDropdownProps
  extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement>,
    React.RefAttributes<HTMLDivElement> {
  /**
   * Input placeholder text. Displayed until option is selected.
   * @deprecated Use `placeholder`
   */
  placeHolder?: string;

  /**
   * Options for the dropdown. If using `defaultSelectedKey` or `defaultSelectedKeys`, options must be
   * pure for correct behavior.
   */
  options: IDropdownOption[];

  /**
   * Callback issued when the selected option changes.
   */
  onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;

  /**
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (option: IDropdownOption, index?: number) => void;

  /**
   * Custom render function for the label.
   */
  onRenderLabel?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for placeholder text
   */
  onRenderPlaceholder?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for placeholder text
   * @deprecated Use `onRenderPlaceholder`
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption[]>;

  /**
   * Optional custom renderer for chevron icon
   */
  onRenderCaretDown?: IRenderFunction<IDropdownProps>;

  /**
   * Custom width for dropdown. If value is 0, width of the input field is used.
   * If value is 'auto', width of the input field is used by default, and it can grow wider to fit the content.
   * @defaultvalue 0
   */
  dropdownWidth?: number | 'auto';

  /**
   * Pass in ResponsiveMode to manually overwrite the way the Dropdown renders.
   * ResponsiveMode.large would, for instance, disable the behavior where Dropdown options
   * get rendered into a Panel while ResponsiveMode.small would result in the Dropdown
   * options always getting rendered in a Panel.
   */
  responsiveMode?: ResponsiveMode;

  /**
   * Keys that will be initially used to set selected items. This prop is used for `multiSelect`
   * scenarios. In other cases, `defaultSelectedKey` should be used.
   */
  defaultSelectedKeys?: string[] | number[];

  /**
   * Keys of the selected items. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   * Passing null in will clear the selection.
   * Mutually exclusive with `defaultSelectedKeys`.
   */
  selectedKeys?: string[] | number[] | null;

  /**
   * When multiple items are selected, this still will be used to separate values in
   * the dropdown title.
   *
   * @defaultvalue ", "
   */
  multiSelectDelimiter?: string;

  /**
   * Optional preference to have onChanged still be called when an already selected item is
   * clicked in single select mode.  Default to false
   */
  notifyOnReselect?: boolean;

  /**
   * @deprecated Use `disabled` instead. Deprecated at v0.52.0.
   */
  isDisabled?: boolean;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
}

/**
 * {@docCategory Dropdown}
 */
export interface IDropdownOption<T = any> extends ISelectableOption<T> {
  /**
   * @deprecated Use `selected` instead. Deprecated at v.65.1.
   */
  isSelected?: boolean;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Dropdown}
 */
export type IDropdownStyleProps = Pick<IDropdownProps, 'theme' | 'className' | 'disabled' | 'required'> & {
  /**
   * Whether the dropdown is in an error state.
   */
  hasError: boolean;

  /**
   * Specifies if the dropdown has label content.
   */
  hasLabel: boolean;

  /**
   * Whether the dropdown is in an opened state.
   */
  isOpen: boolean;

  /**
   * Whether the dropdown is presently rendering a placeholder.
   */
  isRenderingPlaceholder: boolean;

  /**
   * Optional custom className for the panel that displays in small viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  panelClassName?: string;

  /**
   * Optional custom className for the callout that displays in larger viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  calloutClassName?: string;

  /**
   * Prop to notify on what edge the dropdown callout was positioned respective to the title.
   */
  calloutRenderEdge?: RectangleEdge;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Dropdown}
 */
export interface IDropdownStyles {
  /** Root element of the Dropdown (includes Label and the actual Dropdown). */
  root: IStyle;

  /** Refers to the label associated with the dropdown. This is enclosed by the root. */
  label: IStyle;

  /** Refers to the actual Dropdown element. */
  dropdown: IStyle;

  /** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
  title: IStyle;

  /** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
  caretDownWrapper: IStyle;

  /** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
  caretDown: IStyle;

  /** Refers to the error message being rendered under the Dropdown (if any). */
  errorMessage: IStyle;

  /** Refers to the element that wraps `dropdownItems`. */
  dropdownItemsWrapper: IStyle;

  /** Refers to the FocusZone wrapping the individual dropdown items. */
  dropdownItems: IStyle;

  /** Refers to the individual dropdown item. */
  dropdownItem: IStyle;

  /** Style for a dropdown item when it is being selected. */
  dropdownItemSelected: IStyle;

  /** Style for a dropdown item when it is disabled. */
  dropdownItemDisabled: IStyle;

  /** Style for a dropdown item when it is both selected and disabled. */
  dropdownItemSelectedAndDisabled: IStyle;

  /** Style for a dropdown item when it is hidden */
  dropdownItemHidden: IStyle;

  /**
   * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
   * referred to by `dropdownItem`.
   */
  dropdownOptionText: IStyle;

  /** Refers to the dropdown separator. */
  dropdownDivider: IStyle;

  /** Style for dropdown separator when hidden. */
  dropdownDividerHidden: IStyle;

  /** Refers to the individual dropdown items that are being rendered as a header. */
  dropdownItemHeader: IStyle;

  /** Style for dropdown header when hidden. */
  dropdownItemHeaderHidden: IStyle;

  /**
   * Refers to the panel that hosts the Dropdown options in small viewports.
   * @deprecated Use `subComponentStyles.panel` instead.
   */
  panel: IStyle;

  /** Refers to the callout that hosts Dropdown options in larger viewports. */
  callout: IStyle;

  /** Subcomponent styles. */
  subComponentStyles: IDropdownSubComponentStyles;
}

/**
 * {@docCategory Dropdown}
 */
export interface IDropdownSubComponentStyles {
  /** Refers to the panel that hosts the Dropdown options in small viewports. */
  panel: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;

  /** Refers to the primary label for the Dropdown. */
  label: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;

  /** Refers to the individual dropdown item when the multiSelect prop is true. */
  multiSelectItem: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
}
