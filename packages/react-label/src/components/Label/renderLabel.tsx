import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { labelShorthandProps } from './useLabel';
import type { LabelState } from './Label.types';

/**
 * Render the final JSX of Label
 * {@docCategory Label}
 */
export const renderLabel = (state: LabelState) => {
  const { slots, slotProps } = getSlotsCompat(state, labelShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.children}
      {state.required && <slots.required {...slotProps.required} />}
    </slots.root>
  );
};
