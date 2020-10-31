import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { ButtonState } from './Button.types';
import { buttonShorthandProps } from './useButton';
import { childrenExist } from '@fluentui/react-utilities';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots(state, buttonShorthandProps);
  const { loading, iconPosition, iconOnly } = state;

  // TODO: isn't this duplicated with resolveShorthandProps logic?
  if (typeof state.children === 'function') {
    return state.children(slots.root, { ...state, children: undefined });
  }

  return (
    <slots.root {...slotProps.root}>
      {loading && <slots.loader {...slotProps.loader} />}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (childrenExist(state.children) ? state.children : <slots.content {...slotProps.content} />)}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
