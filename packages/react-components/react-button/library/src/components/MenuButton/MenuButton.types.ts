import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonBaseProps, ButtonBaseState, ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

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

/**
 * MenuButton Props without the `appearance`/`size`/`shape` styling props, for headless usage.
 */
export type MenuButtonBaseProps = ComponentProps<MenuButtonSlots> &
  Pick<ButtonBaseProps, 'disabled' | 'disabledFocusable'>;

/**
 * MenuButton State without the `appearance`/`size`/`shape` styling props, for headless usage.
 */
export type MenuButtonBaseState = ComponentState<MenuButtonSlots> &
  Omit<ButtonBaseState, keyof ButtonSlots | 'components' | 'iconPosition'>;
