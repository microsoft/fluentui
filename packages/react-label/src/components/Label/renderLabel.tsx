import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { LabelState } from './Label.types';
import { labelShorthandProps } from './useLabel';

/**
 * Render the final JSX of Label
 * {@docCategory Label}
 */
export const renderLabel = (state: LabelState) => {
  const { slots, slotProps } = getSlots(state, labelShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.children}
      {state.required && <slots.required {...slotProps.required} />}
    </slots.root>
  );
};
