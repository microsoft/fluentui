import * as React from 'react';
import { ComposeOptions } from '@fluentui/react-compose';
import { ComposeStandardStatics, ShorthandValue } from '../../utils/tempTypes';
import { ButtonProps, ButtonSlots, ButtonTokens } from '../Button/Button.types';

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export interface MenuButtonProps extends ButtonProps {
  /**
   * Shorthand menu that is displayed when the button is pressed.
   */
  menu?: ShorthandValue<{}>;
}

export interface MenuButtonState extends MenuButtonProps {}

export interface MenuButtonSlots extends ButtonSlots {
  menu: React.ElementType;
}

export type MenuButtonSlotProps = {
  [key in keyof MenuButtonSlots]: MenuButtonProps[key];
};

export interface MenuButtonOptions
  extends ComposeOptions<MenuButtonProps, MenuButtonSlots, MenuButtonSlotProps, ComposeStandardStatics> {}

export type MenuButtonTokens = ButtonTokens & {};
