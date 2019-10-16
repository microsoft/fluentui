import * as React from 'react';
import { BaseButton } from './BaseButton';
import { Button } from './Button';
import { IButtonClassNames } from './BaseButton.classNames';
import { ISplitButtonClassNames } from './SplitButton/SplitButton.classNames';
import { IRefObject, IRenderFunction, KeyCodes, IComponentAs } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IIconProps } from '../../Icon';
import { IStyle, ITheme } from '../../Styling';
import { IKeytipProps } from '../../Keytip';

/**
 * {@docCategory Button}
 */
export interface IButton {
  /**
   * Sets focus to the button.
   */
  focus: () => void;

  /**
   * If there is a menu associated with this button and it is visible, this will dismiss the menu
   */
  dismissMenu: () => void;

  /**
   * If there is a menu associated with this button and it is visible, this will open the menu.
   * Params are optional overrides to the ones defined in 'menuProps' to apply to just this instance of opening the menu.
   *
   * @param shouldFocusOnContainer - override to the ContextualMenu shouldFocusOnContainer prop.
   * BaseButton implementation defaults to 'undefined'.
   * @param shouldFocusOnMount - override to the ContextualMenu shouldFocusOnMount prop. BaseButton implementation defaults to 'true'.
   */
  openMenu: (shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void;
}

/**
 * {@docCategory Button}
 */
export interface IButtonProps
  extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement> {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IButton>;

  /**
   * If provided, this component will be rendered as an anchor.
   * @defaultvalue ElementType.anchor
   */
  href?: string;

  /**
   * Changes the visual presentation of the button to be emphasized (if defined)
   * @defaultvalue false
   */
  primary?: boolean;

  /**
   * Unique id to identify the item. Typically a duplicate of key value.
   */
  uniqueId?: string | number;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button can have focus in disabled mode
   */
  allowDisabledFocus?: boolean;

  /**
   * If set to true and if this is a splitButton (split == true) then the primary action of a split button is disabled.
   */
  primaryDisabled?: boolean;

  /**
   * Custom styling for individual elements within the button DOM.
   */
  styles?: IButtonStyles;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Whether the button is checked
   */
  checked?: boolean;

  /**
   * Whether button is a toggle button with distinct on and off states. This should be true for buttons that permanently
   * change state when a press event finishes, such as a volume mute button.
   */
  toggle?: boolean;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;

  /**
   * If provided and is true it adds an 'aria-hidden' attribute instructing screen readers to ignore the element.
   */
  ariaHidden?: boolean;

  /**
   * Text to render button label. If text is supplied, it will override any string in button children.
   * Other children components will be passed through after the text.
   */
  text?: string;

  /**
   * The props for the icon shown in the button.
   */
  iconProps?: IIconProps;

  /**
   * Props for button menu. Providing this will default to showing the menu icon. See menuIconProps for overriding
   * how the default icon looks. Providing this in addition of onClick and setting the split property to true will render a SplitButton.
   */
  menuProps?: IContextualMenuProps;

  /**
   * Callback that runs after Button's contextualmenu was closed (removed from the DOM)
   */
  onAfterMenuDismiss?: () => void;

  /**
   * If set to true, and if menuProps and onClick are provided, the button will render as a SplitButton. Defaults to false.
   */
  split?: boolean;

  /**
   * The props for the icon shown when providing a menu dropdown.
   */
  menuIconProps?: IIconProps;

  /**
   * Accessible label for the dropdown chevron button if this button is split.
   */
  splitButtonAriaLabel?: string;

  /**
   * Optional callback when menu is clicked.
   */
  onMenuClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;

  /**
   * Custom render function for the icon
   */
  onRenderIcon?: IRenderFunction<IButtonProps>;

  /**
   * Custom render function for the label text.
   */
  onRenderText?: IRenderFunction<IButtonProps>;

  /**
   * Custom render function for the desciption text.
   */
  onRenderDescription?: IRenderFunction<IButtonProps>;

  /**
   * Custom render function for the aria description element.
   */
  onRenderAriaDescription?: IRenderFunction<IButtonProps>;

  /**
   * Custom render function for rendering the button children.
   */
  onRenderChildren?: IRenderFunction<IButtonProps>;

  /**
   * Custom render function for button menu icon
   */
  onRenderMenuIcon?: IRenderFunction<IButtonProps>;

  /**
   * Deprecated at v6.3.2, to be removed at \>= v7.0.0. Use `menuAs` instead.
   * @deprecated Use `menuAs` instead.
   */
  onRenderMenu?: IRenderFunction<IContextualMenuProps>;

  /**
   * Render a custom menu in place of the normal one.
   */
  menuAs?: IComponentAs<IContextualMenuProps>;

  /**
   * Description of the action this button takes.
   * Only used for compound buttons
   */
  secondaryText?: string;

  /**
   * Deprecated at v1.2.3, to be removed at \>= v2.0.0. Use specific button component instead.
   * @defaultvalue ButtonType.default
   * @deprecated Use specific button component instead.
   */

  buttonType?: ButtonType;

  /**
   * Deprecated at v0.56.2, to be removed at \>= v1.0.0. Just pass in button props instead.
   * they will be mixed into the button/anchor element rendered by the component.
   * @deprecated Use button props instead.
   */
  rootProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;

  /**
   * Any custom data the developer wishes to associate with the menu item.
   * Deprecated, use `checked` if setting state.
   * @deprecated unused, use `checked` if setting state.
   */
  toggled?: boolean;

  /**
   * Any custom data the developer wishes to associate with the menu item.
   */
  data?: any;

  /**
   * Method to provide the classnames to style a button.
   * The default value for this prop is the getClassnames func
   * defined in BaseButton.classnames.
   * @defaultvalue getBaseButtonClassNames
   */
  getClassNames?: (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    hasMenu: boolean,
    isSplit: boolean | undefined,
    allowDisabledFocus: boolean
  ) => IButtonClassNames;

  /**
   * Method to provide the classnames to style a button.
   * The default value for this prop is the getClassnames func
   * defined in BaseButton.classnames.
   * @defaultvalue getBaseSplitButtonClassNames
   */
  getSplitButtonClassNames?: (
    disabled: boolean,
    expanded: boolean,
    checked: boolean,
    allowDisabledFocus: boolean
  ) => ISplitButtonClassNames;

  /**
   * Provides a custom KeyCode that can be used to open the button menu.
   * The default KeyCode is the down arrow. A value of null can be provided to disable the key codes for opening the button menu.
   */
  menuTriggerKeyCode?: KeyCodes | null;

  /**
   * Optional keytip for this button
   */
  keytipProps?: IKeytipProps;

  /**
   * Menu will not be created or destroyed when opened or closed, instead it
   * will be hidden. This will improve perf of the menu opening but could potentially
   * impact overall perf by having more elements in the dom. Should only be used
   * when perf is important.
   * Note: This may increase the amount of time it takes for the button itself to mount.
   */
  persistMenu?: boolean;

  /**
   * If true, the persisted menu is rendered hidden when the button
   * initially mounts. Non-persisted menus will
   * not be in the component tree unless they are being shown
   *
   * Note: This increases the time the button will take to mount, but
   * can improve perceived menu open perf. when the user opens the menu.
   *
   * @defaultvalue undefined, equivalent to false
   *
   * @deprecated There is known bug in Edge when this prop is true where scrollbars
   * overlap with the content when a menu is first rendered hidden.
   * See: https://github.com/OfficeDev/office-ui-fabric-react/issues/9034
   * Please do not start using this. If you are already using this,
   * please make sure that you are doing so only in non-Edge browsers
   */
  renderPersistedMenuHiddenOnMount?: boolean;

  /**
   * Experimental prop that get passed into the menuButton that's rendered as part of
   * split button. Anything passed in will likely need to have accompanying
   * style changes.
   */
  splitButtonMenuProps?: IButtonProps;

  /**
   * Style for the description text if applicable (for compound buttons.)
   * Deprecated, use `secondaryText` instead.
   * @deprecated Use `secondaryText` instead.
   */
  description?: IStyle;

  /**
   * yet unknown docs
   */
  defaultRender?: any;

  /**
   * Optional props to be applied only to the primary action button of SplitButton and not to the overall SplitButton container
   */
  primaryActionButtonProps?: IButtonProps;
}

/**
 * {@docCategory Button}
 */
export enum ElementType {
  /** <button> element. */
  button = 0,
  /** <a> element. */
  anchor = 1
}

/**
 * {@docCategory Button}
 */
export enum ButtonType {
  normal = 0,
  primary = 1,
  hero = 2,
  compound = 3,
  command = 4,
  icon = 5,
  default = 6
}

/**
 * {@docCategory Button}
 */
export interface IButtonStyles {
  /**
   * Style for the root element in the default enabled, non-toggled state.
   */
  root?: IStyle;

  /**
   * Style override for the root element in a checked state, layered on top of the root style.
   */
  rootChecked?: IStyle;

  /**
   * Style override for the root element in a disabled state, layered on top of the root style.
   */
  rootDisabled?: IStyle;

  /**
   * Style override applied to the root on hover in the default, enabled, non-toggled state.
   */
  rootHovered?: IStyle;

  /**
   * Style override applied to the root on focus in the default, enabled, non-toggled state.
   */
  rootFocused?: IStyle;

  /**
   * Style override applied to the root on pressed in the default, enabled, non-toggled state.
   */
  rootPressed?: IStyle;

  /**
   * Style override applied to the root on when menu is expanded in the default, enabled, non-toggled state.
   */
  rootExpanded?: IStyle;

  /**
   * Style override applied to the root on hover in a checked, enabled state
   */
  rootCheckedHovered?: IStyle;

  /**
   * Style override applied to the root on pressed in a checked, enabled state
   */
  rootCheckedPressed?: IStyle;

  /**
   * Style override applied to the root on hover in a checked, disabled state
   */
  rootCheckedDisabled?: IStyle;

  /**
   * Style override applied to the root on hover in a expanded state on hover
   */
  rootExpandedHovered?: IStyle;

  /**
   * Style override for the root element when it has a menu button, layered on top of the root style.
   */
  rootHasMenu?: IStyle;

  /**
   * Style for the flexbox container within the root element.
   */
  flexContainer?: IStyle;

  /**
   * Style for the text container within the flexbox container element (and contains the text and description).
   */
  textContainer?: IStyle;

  /**
   * Style for the icon on the near side of the label.
   */
  icon?: IStyle;

  /**
   * Style for the icon on the near side of the label on hover.
   */
  iconHovered?: IStyle;

  /**
   * Style for the icon on the near side of the label when pressed.
   */
  iconPressed?: IStyle;

  /**
   * Style for the icon on the near side of the label when expanded.
   */
  iconExpanded?: IStyle;

  /**
   * Style for the icon on the near side of the label when expanded and hovered.
   */
  iconExpandedHovered?: IStyle;

  /**
   * Style override for the icon when the button is disabled.
   */
  iconDisabled?: IStyle;

  /**
   * Style override for the icon when the button is checked.
   */
  iconChecked?: IStyle;

  /**
   * Style for the text content of the button.
   */
  label?: IStyle;

  /**
   * Style override for the text content when the button is hovered.
   */
  labelHovered?: IStyle;

  /**
   * Style override for the text content when the button is disabled.
   */
  labelDisabled?: IStyle;

  /**
   * Style override for the text content when the button is checked.
   */
  labelChecked?: IStyle;

  /**
   * Style for the menu chevron.
   */
  menuIcon?: IStyle;

  /**
   * Style for the menu chevron on hover.
   */
  menuIconHovered?: IStyle;

  /**
   * Style for the menu chevron when pressed.
   */
  menuIconPressed?: IStyle;

  /**
   * Style for the menu chevron when expanded.
   */
  menuIconExpanded?: IStyle;

  /**
   * Style for the menu chevron when expanded and hovered.
   */
  menuIconExpandedHovered?: IStyle;

  /**
   * Style override for the menu chevron when the button is disabled.
   */
  menuIconDisabled?: IStyle;

  /**
   * Style override for the menu chevron when the button is checked.
   */
  menuIconChecked?: IStyle;

  /**
   * Style for the description text if applicable (for compound buttons.)
   */
  description?: IStyle;

  /**
   * Style for the description text if applicable (for compound buttons.)
   */
  secondaryText?: IStyle;

  /**
   * Style override for the description text when the button is hovered.
   */
  descriptionHovered?: IStyle;

  /**
   * Style for the description text when the button is pressed.
   */
  descriptionPressed?: IStyle;

  /**
   * Style override for the description text when the button is disabled.
   */
  descriptionDisabled?: IStyle;

  /**
   * Style override for the description text when the button is checked.
   */
  descriptionChecked?: IStyle;

  /**
   * Style override for the screen reader text.
   */
  screenReaderText?: IStyle;

  /**
   * Style override for the container div around a SplitButton element
   */
  splitButtonContainer?: IStyle;

  /**
   * Style for container div around a SplitButton element when the button is hovered.
   */
  splitButtonContainerHovered?: IStyle;

  /**
   * Style for container div around a SplitButton element when the button is focused.
   */
  splitButtonContainerFocused?: IStyle;

  /**
   * Style for container div around a SplitButton element when the button is checked.
   */
  splitButtonContainerChecked?: IStyle;

  /**
   * Style for container div around a SplitButton element when the button is checked and hovered.
   */
  splitButtonContainerCheckedHovered?: IStyle;

  /**
   * Style override for the container div around a SplitButton element in a disabled state
   */
  splitButtonContainerDisabled?: IStyle;

  /**
   * Style override for the divider element that appears between the button and menu button
   * for a split button.
   */
  splitButtonDivider?: IStyle;

  /**
   * Style override for the divider element that appears between the button and menu button
   * for a split button in a disabled state.
   */
  splitButtonDividerDisabled?: IStyle;

  /**
   * Style override for the SplitButton menu button
   */
  splitButtonMenuButton?: IStyle;

  /**
   * Style override for the SplitButton menu button element in a disabled state.
   */
  splitButtonMenuButtonDisabled?: IStyle;

  /**
   * Style override for the SplitButton menu button element in a checked state
   */
  splitButtonMenuButtonChecked?: IStyle;

  /**
   * Style override for the SplitButton menu button element in an expanded state
   */
  splitButtonMenuButtonExpanded?: IStyle;

  /**
   * Style override for the SplitButton menu icon element
   */
  splitButtonMenuIcon?: IStyle;

  /**
   * Style override for the SplitButton menu icon element in a disabled state
   */
  splitButtonMenuIconDisabled?: IStyle;

  /**
   * Style override for the SplitButton FlexContainer.
   */
  splitButtonFlexContainer?: IStyle;
}
