import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-utils';
import { ButtonProps, ButtonVariants } from '../Button/Button.types';
import { MenuButtonProps, MenuButtonState, MenuButtonTokens } from '../MenuButton/MenuButton.types';

/**
 * {@docCategory Button}
 */
export interface SplitButtonProps extends ButtonProps, MenuButtonProps {
  /**
   * Button to perform primary action in SplitButton.
   */
  button?: ShorthandProps;

  /**
   * Divider that separates the primary action button and the menu button parts of the SplitButton
   */
  divider?: ShorthandProps;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: ShorthandProps<MenuButtonProps>;

  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

export interface SplitButtonState extends Omit<SplitButtonProps, 'menu'>, MenuButtonState {}

/**
 * {@docCategory Button}
 */
export type SplitButtonTokens = MenuButtonTokens & {
  dividerColor?: string;
  dividerThickness?: string;
};

/**
 * {@docCategory Button}
 */
export type SplitButtonVariants = ButtonVariants<SplitButtonTokens>;
