import * as React from 'react';
import { BaseButton } from './BaseButton';
import { Button } from './Button';
import { IRenderFunction } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IIconProps, IconName } from '../../Icon';

export interface IButton {
  /**
   * Sets focus to the button.
   */
  focus: () => void;
}

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement | BaseButton | Button> {
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
   * how the default icon looks.
   */
  menuProps?: IContextualMenuProps;

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
  rootProps?: React.HTMLProps<HTMLButtonElement> | React.HTMLProps<HTMLAnchorElement>;

  /**
   * Deprecated on 4/15/2017, use iconProps={ { iconName: 'Emoji2' } } .
   * @deprecated
   */
  icon?: string;

  /**
   * Deprecated on 4/15/2017, use menuIconProps={ { iconName: 'Emoji2' } } .
   * @deprecated
   */
  menuIconName?: IconName | string | null;

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
