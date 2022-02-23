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
      <div className={state.containerClassName}>
        <slots.indicator {...slotProps.indicator} />
        <slots.input {...slotProps.input} />
      </div>
      <slots.label {...slotProps.label}>
        {state.label.children}
        {state.subtext && slots.subtext && <slots.subtext {...slotProps.subtext} />}
      </slots.label>
    </slots.root>
  );
};
