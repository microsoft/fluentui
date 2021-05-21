import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { labelShorthandProps, LabelState } from './Label.types';

/**
 * Render the final JSX of Label
 */
export const renderLabel = (state: LabelState) => {
  const { slots, slotProps } = getSlots(state, labelShorthandProps);

  return (
    <>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
      {state.required && <slots.asterisk {...slotsProps.asterisk} />}
      {state.info && <slots.info {...slotProps.info} />}
    </>
  );
};
