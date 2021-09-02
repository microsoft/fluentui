import * as React from 'react';
import type { ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import type {
  ButtonDefaultedProps,
  ButtonProps,
  ButtonShorthandPropsCompat,
  ButtonState,
} from '../Button/Button.types';

// Align with MenuTriggerChildProps in @fluentui/react-menu as needed
export interface PassedMenuProps
  extends Pick<
    React.HTMLAttributes<HTMLElement>,
    | 'aria-haspopup'
    | 'aria-expanded'
    | 'id'
    | 'onClick'
    | 'onContextMenu'
    | 'onKeyDown'
    | 'onMouseEnter'
    | 'onMouseLeave'
  > {}

export type MenuButtonProps = Omit<ButtonProps, 'iconPosition'> &
  PassedMenuProps & {
    /**
     * Menu icon that indicates that this button has a menu that can be expanded.
     */
    menuIcon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  };

export type MenuButtonShorthandPropsCompat = ButtonShorthandPropsCompat | 'menuIcon';

export type MenuButtonDefaultedProps = ButtonDefaultedProps | 'menuIcon';

export interface MenuButtonState
  extends Omit<ButtonState, 'iconPosition'>,
    ComponentStateCompat<MenuButtonProps, MenuButtonShorthandPropsCompat, MenuButtonDefaultedProps> {}
