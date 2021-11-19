import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { labelShorthandProps } from './useLabel';
import type { LabelState, LabelSlots } from './Label.types';

/**
 * Render the final JSX of Label
 */
export const renderLabel = (state: LabelState) => {
  const { slots, slotProps } = getSlots<LabelSlots>(state, labelShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      <slots.required {...slotProps.required} />
    </slots.root>
  );
};
