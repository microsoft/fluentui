import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { InputState } from './Input.types';
import { inputShorthandProps } from './useInput';

/**
 * Render the final JSX of Input
 */
export const renderInput = (state: InputState) => {
  const { slots, slotProps } = getSlotsCompat(state, inputShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};
