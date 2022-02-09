import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { RadioItemState, RadioItemSlots } from './RadioItem.types';

/**
 * Render the final JSX of RadioItem
 */
export const renderRadioItem_unstable = (state: RadioItemState) => {
  const { slots, slotProps } = getSlots<RadioItemSlots>(state);

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
