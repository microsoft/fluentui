import type { MenuTriggerChildProps } from '@fluentui/react-menu';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { ButtonCommons, ButtonSlots, ButtonState } from '../Button/Button.types';

export type MenuButtonSlots = ButtonSlots & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: IntrinsicShorthandProps<'span'>;
};

export type MenuButtonProps = ComponentProps<MenuButtonSlots> &
  Partial<Omit<ButtonCommons, 'iconPosition'>> &
  Partial<MenuTriggerChildProps>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'iconPosition'>;
