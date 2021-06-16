import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TextState } from './Text.types';
import { textShorthandProps } from './useText';

/**
 * Render the final JSX of Text
 */
export const renderText = (state: TextState) => {
  const { slots, slotProps } = getSlots(state, textShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};
