import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { RadioSlots, RadioState } from './Radio.types';

/**
 * Render the final JSX of Radio
 */
export const renderRadio_unstable = (state: RadioState) => {
  const { slots, slotProps } = getSlots<RadioSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.indicator {...slotProps.indicator} />
      {slots.label && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
