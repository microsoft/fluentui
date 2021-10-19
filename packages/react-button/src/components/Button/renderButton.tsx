import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots<ButtonSlots>(state, ['root', 'icon']);
  const { iconOnly, iconPosition } = state;

  return (
    <slots.root {...slotProps.root}>
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
