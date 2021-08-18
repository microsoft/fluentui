import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { InputSlots, InputState } from './Input.types';
import { inputShorthandProps } from './useInput';

/**
 * Render the final JSX of Input
 */
export const renderInput = (state: InputState) => {
  const { slots, slotProps } = getSlots<InputSlots>(state, inputShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.bookendBefore {...slotProps.bookendBefore} />
      {/* TODO is wrapper needed? (for borders, focus styling, etc) */}
      <slots.inputWrapper {...slotProps.inputWrapper}>
        <slots.insideStart {...slotProps.insideStart} />
        <slots.input {...slotProps.input} />
        <slots.insideEnd {...slotProps.insideEnd} />
      </slots.inputWrapper>
      <slots.bookendAfter {...slotProps.bookendAfter} />
    </slots.root>
  );
};
