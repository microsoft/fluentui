import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { ButtonProps } from '../Button/Button.types';
import {
  MenuButtonProps,
  MenuButtonState,
  MenuButtonStyleSelectors,
  MenuButtonTokens,
  MenuButtonVariants,
} from '../MenuButton/MenuButton.types';

/**
 * {@docCategory Button}
 */
export interface SplitButtonProps extends ButtonProps, MenuButtonProps {
  /**
   * Button to perform primary action in SplitButton.
   */
  button?: ShorthandProps<ButtonProps>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: ShorthandProps<MenuButtonProps>;

  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * {@docCategory Button}
 */
export interface SplitButtonState
  extends Omit<SplitButtonProps, 'children' | 'icon' | 'menu' | 'menuIcon'>,
    MenuButtonState {
  button?: ObjectShorthandProps<ButtonProps>;
  menuButton?: ObjectShorthandProps<MenuButtonProps>;
}

/**
 * {@docCategory Button}
 */
export type SplitButtonStyleSelectors = MenuButtonStyleSelectors & {};

/**
 * {@docCategory Button}
 */
export type SplitButtonTokens = MenuButtonTokens & {
  dividerColor?: string;
};

/**
 * {@docCategory Button}
 */
export type SplitButtonVariants = MenuButtonVariants;

/**
 * {@docCategory Button}
 */
export type SplitButtonVariantTokens = Partial<
  {
    [variant in SplitButtonVariants]: Partial<SplitButtonTokens>;
  }
>;
