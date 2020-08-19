import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { ButtonState } from './Button.types';
import { buttonShorthandProps } from './useButton';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots(state, buttonShorthandProps);
  const { loading, iconPosition, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      {loading && <slots.loader {...slotProps.loader} />}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && <slots.children {...slotProps.children} />}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
