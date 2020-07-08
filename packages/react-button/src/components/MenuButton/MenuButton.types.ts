import * as React from 'react';
import { BaseSlots, SlotProp, SlotProps } from '@fluentui/react-compose';
import { IContextualMenuProps } from 'office-ui-fabric-react';
import { ButtonProps, ButtonTokens } from '../Button/Button.types';

export interface MenuButtonProps extends Omit<ButtonProps, 'icon' | 'iconPosition' | 'loader'> {
  /**
   * Menu that is displayed when the button is pressed.
   */
  // tslint:disable-next-line:no-any
  menu?: SlotProp<IContextualMenuProps>;

  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

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

export interface MenuButtonSlots extends BaseSlots {
  menu: React.ElementType;
  menuIcon: React.ElementType;
}

export type MenuButtonSlotProps = SlotProps<
  MenuButtonSlots,
  MenuButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type MenuButtonTokens = ButtonTokens;
