import * as React from 'react';
import { BaseSlots, SlotProp, SlotProps } from '@fluentui/react-compose';
import { IContextualMenuProps } from 'office-ui-fabric-react';
import { ButtonProps, ButtonState, ButtonTokens } from '../Button/Button.types';

export interface SplitButtonProps extends Omit<ButtonProps, 'icon' | 'iconPosition' | 'loader'> {
  /**
   * Menu that is displayed when the button is pressed.
   */
  menu?: SlotProp<IContextualMenuProps>;

  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Defines the inital expanded state of the SplitButton. Use this if you want the SplitButton to maintain its own
   * state. Mutually exclusive with `expanded`.
   * @defaultvalue false
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the SplitButton is in an expanded state. Use this if you wish to have the expanded state of the
   * SplitButton be controlled. Mutually exclusive with `defaultExpanded`.
   * @defaultvalue defaultExpanded
   */
  expanded?: boolean;

  /**
   * Defines a callback that runs after the SplitButton's contextual menu has been dismissed.
   */
  onMenuDismiss?: () => void;
}

export interface SplitButtonState extends SplitButtonProps, Omit<ButtonState, 'icon' | 'iconPosition' | 'loader'> {}

export interface SplitButtonSlots extends BaseSlots {
  menu: React.ElementType;
  menuIcon: React.ElementType;
}

export type SplitButtonSlotProps = SlotProps<
  SplitButtonSlots,
  SplitButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type SplitButtonTokens = ButtonTokens;
