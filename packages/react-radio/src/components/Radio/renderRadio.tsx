import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { RadioState, RadioSlots } from './Radio.types';

/**
 * Render the final JSX of Radio
 */
export const renderRadio_unstable = (state: RadioState) => {
  const { slots, slotProps } = getSlots<RadioSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      {slots.label && state.labelPosition === 'before' && <slots.label {...slotProps.label} />}
      {slots.indicator && <slots.indicator {...slotProps.indicator} />}
      {slots.label && state.labelPosition !== 'before' && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
