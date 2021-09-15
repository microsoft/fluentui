import type { MenuTriggerChildProps } from '@fluentui/react-menu';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

export type MenuButtonSlots = ButtonSlots & {
  menuIcon?: IntrinsicShorthandProps<'span'>;
};

export type MenuButtonProps = Omit<ButtonProps, 'iconPosition'> &
  Partial<MenuTriggerChildProps> &
  ComponentProps<MenuButtonSlots>;

export interface MenuButtonState
  extends Omit<ButtonState, 'iconPosition' | 'components'>,
    ComponentState<MenuButtonSlots> {}
