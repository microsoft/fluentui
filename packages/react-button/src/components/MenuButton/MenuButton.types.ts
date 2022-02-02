import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';
import type { ButtonCommons, ButtonSlots, ButtonState } from '../Button/Button.types';

export type MenuButtonSlots = ButtonSlots & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: IntrinsicSlotProps<'span'>;
};

export type MenuButtonProps = ComponentProps<MenuButtonSlots> & Partial<Omit<ButtonCommons, 'iconPosition'>>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'iconPosition'>;
