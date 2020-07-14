import * as React from 'react';
import { SlotProp, SlotProps } from '@fluentui/react-compose';
import { ButtonProps, ButtonSlots } from '../Button/Button.types';
import { MenuButtonProps, MenuButtonSlots, MenuButtonState, MenuButtonTokens } from '../MenuButton/MenuButton.types';

export interface SplitButtonProps extends ButtonProps, MenuButtonProps {
  /**
   * Button to perform primary action in SplitButton.
   */
  button?: SlotProp<React.HTMLAttributes<HTMLButtonElement>>;

  /**
   * Divider that separates the primary action button and the menu button parts of the SplitButton
   */
  divider?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: SlotProp<React.HTMLAttributes<HTMLButtonElement>>;
}

export interface SplitButtonState extends SplitButtonProps, MenuButtonState {
  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

export interface SplitButtonSlots extends ButtonSlots, MenuButtonSlots {
  button: React.ElementType;
  divider: React.ElementType;
  menuButton: React.ElementType;
}

export type SplitButtonSlotProps = SlotProps<
  SplitButtonSlots,
  SplitButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type SplitButtonTokens = MenuButtonTokens;
