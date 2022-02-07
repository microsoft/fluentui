import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonCommonsUnstable, ButtonSlots, ButtonState } from '../Button/Button.types';

export type MenuButtonSlots = ButtonSlots & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: Slot<'span'>;
};

export type MenuButtonProps = ComponentProps<MenuButtonSlots> & Partial<Omit<ButtonCommonsUnstable, 'iconPosition'>>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'iconPosition'>;
