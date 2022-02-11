import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { LabelSlots, LabelRender } from './Label.types';

/**
 * Render the final JSX of Label
 */
export const renderLabel_unstable: LabelRender = state => {
  const { slots, slotProps } = getSlots<LabelSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      {slots.required && <slots.required {...slotProps.required} />}
    </slots.root>
  );
};
