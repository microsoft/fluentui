import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { ButtonState } from './Button.types';
import { buttonShorthandPropsCompat } from './useButton';

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlotsCompat(state, buttonShorthandPropsCompat);
  const { children, iconOnly, iconPosition } = state;

  return (
    <slots.root {...slotProps.root}>
      {/*{loading && <slots.loader {...slotProps.loader} />}*/}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && children}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
