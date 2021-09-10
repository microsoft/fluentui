import * as React from 'react';
import type { ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonShorthandPropsCompat } from '../Button/Button.types';
import type { MenuButtonProps } from '../MenuButton/MenuButton.types';

export interface SplitButtonProps extends Omit<ButtonProps, ButtonShorthandPropsCompat>, MenuButtonProps {
  /**
   * Button to perform primary action in SplitButton.
   */
  button?: ShorthandPropsCompat<ButtonProps>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: ShorthandPropsCompat<MenuButtonProps>;

  /**
   * Ref to the menu button element
   */
  menuButtonRef?: React.Ref<HTMLElement>;
}

export type SplitButtonShorthandPropsCompat = 'button' | 'menuButton';

export type SplitButtonDefaultedProps = 'size';

export interface SplitButtonState
  extends ComponentStateCompat<SplitButtonProps, SplitButtonShorthandPropsCompat, SplitButtonDefaultedProps> {}
