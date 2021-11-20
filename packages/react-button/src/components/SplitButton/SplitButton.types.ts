import * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from '../Button/Button.types';
import type { MenuButtonProps, MenuButtonState } from '../MenuButton/MenuButton.types';

export type SplitButtonSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: IntrinsicShorthandProps<'div'>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: ObjectShorthandProps<MenuButtonProps, React.Ref<HTMLButtonElement | HTMLAnchorElement>>;

  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: ObjectShorthandProps<ButtonProps, React.Ref<HTMLButtonElement | HTMLAnchorElement>>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Omit<ButtonProps, 'root'> &
  Omit<MenuButtonProps, 'root'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;
