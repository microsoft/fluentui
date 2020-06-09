import * as React from 'react';
import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';
import { ISelectableDroppableTextProps } from '../../utilities/selectableOption/SelectableDroppableText.types';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { IKeytipProps } from '../../Keytip';
import { RectangleEdge } from '../../utilities/positioning';
import { ICheckboxStyleProps, ICheckboxStyles } from '../Checkbox/Checkbox.types';
import { ILabelStyleProps, ILabelStyles } from '../Label/Label.types';
import { IPanelStyleProps, IPanelStyles } from '../Panel/Panel.types';

export { SelectableOptionMenuItemType as DropdownMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';

export { ResponsiveMode }; // Exported because the type is an optional prop and not exported otherwise.

/**
 * {@docCategory Dropdown}
 */
export interface IDropdown {
  /**
   * All selected options
   */
  readonly selectedOptions: IDropdownOption[];

  focus: (shouldOpenOnFocus?: boolean) => void;
}

/**
 * {@docCategory Dropdown}
 */
export interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement> {
  /**
   * Input placeholder text. Displayed until an option is selected.
   * @deprecated Use `placeholder`
   */
  placeHolder?: string;

  /**
   * Options for the dropdown. If using `defaultSelectedKey` or `defaultSelectedKeys`, options must be
   * pure for correct behavior.
   */
  options: IDropdownOption[];

  /**
   * Callback for when the selected option changes.
   */
  onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;

  /**
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (option: IDropdownOption, index?: number) => void;

  /**
   * Custom renderer for the label.
   */
  onRenderLabel?: IRenderFunction<IDropdownProps>;

  /**
   * Custom renderer for placeholder text
   */
  onRenderPlaceholder?: IRenderFunction<IDropdownProps>;

  /**
   * Custom renderer for placeholder text
   * @deprecated Use `onRenderPlaceholder`
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

  /**
   * Custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption[]>;

  /**
   * Custom renderer for chevron icon
   */
  onRenderCaretDown?: IRenderFunction<IDropdownProps>;

  /**
   * Custom width for dropdown. If value is 0, width of the input field is used.
   * @defaultvalue 0
   */
  dropdownWidth?: number;

  /**
   * By default, the dropdown will render the standard way for screen sizes `large` and above, or
   * in a panel on `small` and `medium` screens. Manually set this prop to override this behavior.
   */
  responsiveMode?: ResponsiveMode;

  /**
   * Keys that will be initially used to set selected items. This prop is only used when `multiSelect`
   * is true (use `defaultSelectedKey` for single select). Mutually exclusive with `selectedKeys`.
   */
  defaultSelectedKeys?: string[] | number[];

  /**
   * Keys of the selected items, only used when `multiSelect` is true (use `selectedKey` for single
   * select). If you provide this, you must maintain selection state by observing onChange events
   * and passing a new prop value in when changed. Passing null will clear the selection.
   * Mutually exclusive with `defaultSelectedKeys`.
   */
  selectedKeys?: string[] | number[] | null;

  /**
   * When multiple items are selected, this will be used to separate values in the dropdown input.
   *
   * @defaultvalue ", "
   */
  multiSelectDelimiter?: string;

  /**
   * If true, `onChange` will still be called when an already-selected item is clicked again in
   * single select mode. (Normally it would not be called in this case.)
   */
  notifyOnReselect?: boolean;

  /**
   * Deprecated at v0.52.0, use `disabled` instead.
   * @deprecated Use `disabled` instead.
   */
  isDisabled?: boolean;

  /**
   * Optional keytip for this dropdown
   */
  keytipProps?: IKeytipProps;

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
export interface IDropdownOption extends ISelectableOption {
  /**
   * Deprecated at v.65.1, use `selected` instead.
   * @deprecated Use `selected` instead.
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
   * Whether the dropdown is currently rendering placeholder text instead of a selected option.
   */
  isRenderingPlaceholder: boolean;

  /**
   * Custom className for the panel that displays in small viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  panelClassName?: string;

  /**
   * Custom className for the callout that displays in larger viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  calloutClassName?: string;

  /**
   * Which edge the dropdown callout was positioned on relative to the title.
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

  /** Refers to the individual dropdown items that are being rendered as a header. */
  dropdownItemHeader: IStyle;

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
