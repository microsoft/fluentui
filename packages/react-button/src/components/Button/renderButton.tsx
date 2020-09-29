import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next';
import { ButtonState } from './Button.types';
import { buttonShorthandProps } from './useButton';
import { childrenExist } from '@fluentui/react-utilities';

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
      {loading && <slots.loader {...slotProps.loader} />}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && (
        <slots.content {...slotProps.content}>
          {childrenExist(children) ? children : slotProps.content.children}
        </slots.content>
      )}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
