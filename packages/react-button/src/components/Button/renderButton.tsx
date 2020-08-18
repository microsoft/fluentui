import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { ButtonState } from './Button.types';
import { buttonShorthandProps } from './useButton';
import { childrenExist } from '@fluentui/react-utilities';

// TODO: make work, fix tests, PR :P
// TODO: fix react-button too, make all work

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots(state, buttonShorthandProps);
  const { children, iconOnly, iconPosition, loading } = state;

  if (typeof children === 'function') {
    // TODO: hoist converged typings for children prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return children({ state, slots, slotProps });
  }

  return (
    <slots.root {...slotProps.root}>
      {slotProps.loader && loading && <slots.loader {...slotProps.loader} />}
      {slotProps.icon && iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {(slotProps.content || childrenExist(children)) && !iconOnly && (
        <slots.content {...slotProps.content}>{children}</slots.content>
      )}
      {slotProps.icon && iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
