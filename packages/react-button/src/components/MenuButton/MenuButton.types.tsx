import * as React from 'react';
import { ComposeOptions } from '@fluentui/react-compose';
import { ComposeStandardStatics, ShorthandValue } from '../../utils/tempTypes';
import { ButtonProps, ButtonTokens } from '../Button/Button.types';

export interface MenuButtonProps extends Omit<ButtonProps, 'icon' | 'loader'> {
  /**
   * Shorthand menu that is displayed when the button is pressed.
   */
  menu?: ShorthandValue<{}>;

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
}

export interface MenuButtonState extends MenuButtonProps {
  /**
   * Defines the React reference to the MenuButton element.
   */
  ref: (instance: HTMLElement) => void;
}

export interface MenuButtonSlots {
  menu: React.ElementType;
}

export type MenuButtonSlotProps = {
  [key in keyof MenuButtonSlots]: MenuButtonProps[key];
};

export interface MenuButtonOptions
  extends ComposeOptions<MenuButtonProps, MenuButtonSlots, MenuButtonSlotProps, ComposeStandardStatics> {}

export type MenuButtonTokens = ButtonTokens & {};
