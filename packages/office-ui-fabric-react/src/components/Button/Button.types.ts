import * as React from 'react';
import { BaseButton } from './BaseButton';
import { Button } from './Button';
import { IButtonClassNames } from './BaseButton.classNames';
import { ISplitButtonClassNames } from './SplitButton/SplitButton.classNames';
import { IRenderFunction, KeyCodes } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IIconProps } from '../../Icon';
import { IStyle, ITheme } from '../../Styling';

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
   * If there is a menu associated with this button and it is visible, this will open the menu
   */
  openMenu: () => void;
}

export interface IButtonProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button> {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IButton | null) => void;

  /**
   * If provided, this component will be rendered as an anchor.
   * @default ElementType.anchor
   */
  href?: string;

  /**
   * Changes the visual presentation of the button to be emphasized (if defined)
   * @default false
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
  * Text to render button label. If text is supplied, it will override any string in button children. Other children components will be passed through after the text.
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
  * Custom render function for button menu
  */
  onRenderMenu?: IRenderFunction<IContextualMenuProps>;

  /**
   * Description of the action this button takes.
   * Only used for compound buttons
   */
  description?: string;

  /**
   * Deprecated at v1.2.3, to be removed at >= v2.0.0. Use specific button component instead
   * @defaultvalue ButtonType.default
   * @deprecated
   */

  buttonType?: ButtonType;

  /**
   * Deprecated at v0.56.2, to be removed at >= v1.0.0. Just pass in button props instead;
   * they will be mixed into the button/anchor element rendered by the component.
   * @deprecated
   */
  rootProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;

  /**
   * Any custom data the developer wishes to associate with the menu item.
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
  * @default getBaseButtonClassNames
  */
  getClassNames?: (theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined) => IButtonClassNames;

  /**
  * Method to provide the classnames to style a button.
  * The default value for this prop is the getClassnames func
  * defined in BaseButton.classnames.
  * @default getBaseSplitButtonClassNames
  */
  getSplitButtonClassNames?: (disabled: boolean,
    expanded: boolean,
    checked: boolean) => ISplitButtonClassNames;

  /**
  * Provides a custom KeyCode that can be used to open the button menu.
  * The default KeyCode is the down arrow. A value of null can be provided to disable the key codes for opening the button menu.
  */
  menuTriggerKeyCode?: KeyCodes | null;

  /**
   * Menu will not be created or destroyed when opened or closed, instead it
   * will be hidden. This will improve perf of the menu opening but could potentially
   * impact overall perf by having more elemnts in the dom. Should only be used
   * when perf is important.
   * Note: This may increase the amount of time it takes for the button itself to mount.
   */
  persistMenu?: boolean;
}

export enum ElementType {
  /** <button> element. */
  button = 0,
  /** <a> element. */
  anchor = 1
}

export enum ButtonType {
  normal = 0,
  primary = 1,
  hero = 2,
  compound = 3,
  command = 4,
  icon = 5,
  default = 6
}

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
   * Style override applied to the root on hover in the default, enabled, non-toggled state.
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