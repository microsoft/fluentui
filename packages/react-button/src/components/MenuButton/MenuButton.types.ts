import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-utils';
import { MinimalMenuProps } from '@fluentui/react-shared-contexts';
import { ButtonProps, ButtonState, ButtonTokens, ButtonVariants } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export type MenuButtonProps = Omit<ButtonProps, 'iconPosition' | 'loader'> & {
  /**
   * Menu that is displayed when the button is pressed.
   */
  menu?: ShorthandProps;

  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: ShorthandProps;

  /**
   * Defines the inital expanded state of the MenuButton. Use this if you want the MenuButton to maintain its own state.
   * Mutually exclusive with `expanded`.
   * @defaultvalue false
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the MenuButton is in an expanded state. Use this if you wish to have the expanded state of the
   * MenuButton be controlled. Mutually exclusive with `defaultExpanded`.
   * @defaultvalue defaultExpanded
   */
  expanded?: boolean;

  /**
   * Defines a callback that runs after the MenuButton's contextual menu has been dismissed.
   */
  onMenuDismiss?: () => void;
};

export interface MenuButtonState extends Omit<MenuButtonProps, 'menu'>, Omit<ButtonState, 'iconPosition' | 'loader'> {
  menu?: React.PropsWithChildren<MinimalMenuProps>;
}

/**
 * {@docCategory Button}
 */
export type MenuButtonTokens = ButtonTokens & {
  menuIconColor?: string;
  menuIconSize?: string;
};

/**
 * {@docCategory Button}
 */
export type MenuButtonVariants = ButtonVariants<MenuButtonTokens>;
