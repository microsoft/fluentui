import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { optionShorthandProps } from './useOption';
import type { OptionState, OptionSlots } from './Option.types';

/**
 * Render the final JSX of Option
 */
export const renderOption = (state: OptionState) => {
  const { slots, slotProps } = getSlots<OptionSlots>(state, optionShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.check {...slotProps.check}>{slotProps.check.children}</slots.check>
      {slotProps.root.children}
    </slots.root>
  );
};
