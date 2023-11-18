import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

export type MenuButtonSlots = ButtonSlots & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: Slot<'span'>;
};

export type MenuButtonProps = ComponentProps<MenuButtonSlots> &
  Pick<ButtonProps, 'appearance' | 'disabledFocusable' | 'disabled' | 'shape' | 'size'>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'iconPosition'>;
