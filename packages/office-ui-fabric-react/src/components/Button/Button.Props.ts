import * as React from 'react';
import { BaseButton } from './BaseButton';
import { Button } from './Button';
import { IRenderFunction } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IIconProps, IconName } from '../../Icon';
import { IStyle, ITheme } from '../../Styling';

export interface IButton {
  /**
   * Sets focus to the button.
   */
  focus: () => void;
}

export interface IButtonProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | BaseButton | Button> {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IButton) => void;

  /**
   * If provided, this component will be rendered as an anchor.
   * @default ElementType.anchor
   */
  href?: string;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

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
   * If set to true, and if menuProps and onClick are provided, the button will render as a SplitButton. Defaults to false.
   */
  split?: boolean;

  /**
   * The props for the icon shown when providing a menu dropdown.
   */
  menuIconProps?: IIconProps;

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
   * Deprecated on 4/15/2017, use iconProps={ { iconName: 'Emoji2' } }.
   * @deprecated
   */
  icon?: string;

  /**
   * Deprecated on 4/15/2017, use menuIconProps={ { iconName: 'Emoji2' } }.
   * @deprecated
   */
  menuIconName?: IconName | string | null;

  /**
   * Deprecated on 5/26/2016, use checked.
   * @deprecated
   */
  toggled?: boolean;
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
   * Style for the flexbox container within the root element.
   */
  flexContainer?: IStyle;

  /**
   * Style for the icon on the near side of the label.
   */
  icon?: IStyle;

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
   * Style override for the container div around a SplitButton element in a disabled state
   */
  splitButtonContainerDisabled?: IStyle;

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
