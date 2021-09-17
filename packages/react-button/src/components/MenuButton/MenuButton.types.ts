import * as React from 'react';
import type { MenuTriggerChildProps } from '@fluentui/react-menu';
import type { ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import type {
  ButtonDefaultedProps,
  ButtonProps,
  ButtonShorthandPropsCompat,
  ButtonState,
} from '../Button/Button.types';

export type MenuButtonProps = Omit<ButtonProps, 'iconPosition'> &
  Partial<MenuTriggerChildProps> & {
    /**
     * Menu icon that indicates that this button has a menu that can be expanded.
     */
    menuIcon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  };

export type MenuButtonShorthandPropsCompat = ButtonShorthandPropsCompat | 'menuIcon';

export type MenuButtonDefaultedProps = ButtonDefaultedProps | 'menuIcon';

export type MenuButtonState = Omit<ButtonState, 'iconPosition'> &
  ComponentStateCompat<MenuButtonProps, MenuButtonShorthandPropsCompat, MenuButtonDefaultedProps>;
