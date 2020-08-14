import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps } from '../Button/Button.types';
import { MenuButtonProps, MenuButtonState, MenuButtonTokens } from '../MenuButton/MenuButton.types';

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
  menuButton?: ShorthandProps;
}

export interface SplitButtonState extends Omit<SplitButtonProps, 'menu'>, MenuButtonState {
  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

export type SplitButtonTokens = MenuButtonTokens;
