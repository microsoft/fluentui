import * as React from 'react';
import { ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { ButtonDefaultedProps, ButtonProps, ButtonShorthandProps, ButtonState } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export type MenuButtonProps = Omit<ButtonProps, 'iconPosition'> & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  // /**
  //  * Defines the initial expanded state of the MenuButton.
  //  * Use this if you want the MenuButton to maintain its own state.
  //  * Mutually exclusive with `expanded`.
  //  * @default false
  //  */
  // defaultExpanded?: boolean;

  // /**
  //  * Defines whether the MenuButton is in an expanded state.
  //  * Use this if you wish to have the expanded state of the MenuButton be controlled.
  //  * Mutually exclusive with `defaultExpanded`.
  //  * @default defaultExpanded
  //  */
  // expanded?: boolean;

  // /**
  //  * If true, the menu will not be created or destroyed when opened or closed, being hidden instead. This will
  //  * improve the performance of the menu opening but could potentially impact the overall performance by having more
  //  * elements in the DOM. As such, it should only be used when the performance of opening the menu is important.
  //  *
  //  * Note: This may increase the amount of time it takes for the button itself to mount.
  //  */
  // persistMenu?: boolean;

  // /**
  //  * Defines a callback that runs after the MenuButton's contextual menu has been dismissed.
  //  */
  // onMenuDismiss?: (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
};

/**
 * {@docCategory Button}
 */
export type MenuButtonShorthandProps = ButtonShorthandProps | 'menuIcon';

/**
 * {@docCategory Button}
 */
export type MenuButtonDefaultedProps = ButtonDefaultedProps | 'menuIcon';

/**
 * {@docCategory Button}
 */
export interface MenuButtonState
  extends Omit<ButtonState, 'iconPosition'>,
    ComponentState<MenuButtonProps, MenuButtonShorthandProps, MenuButtonDefaultedProps> {}
