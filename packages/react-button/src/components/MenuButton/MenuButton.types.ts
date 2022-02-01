import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';
import type { ButtonCommons, ButtonSlots, ButtonState } from '../Button/Button.types';

// This type mimics the interface found in MenuTrigger.types.ts to allow MenuButton and Menu to play correctly with each
// other without having to tightly couple them.
// https://github.com/microsoft/fluentui/blob/master/packages/react-menu/src/components/MenuTrigger/MenuTrigger.types.ts
type MenuTriggerChildProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onKeyDown' | 'aria-haspopup' | 'aria-expanded' | 'id'
> & {
  ref?: React.Ref<never>;
};

export type MenuButtonSlots = ButtonSlots & {
  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: IntrinsicSlotProps<'span'>;
};

export type MenuButtonProps = ComponentProps<MenuButtonSlots> &
  Partial<Omit<ButtonCommons, 'iconPosition'>> &
  Partial<MenuTriggerChildProps>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'iconPosition'>;
