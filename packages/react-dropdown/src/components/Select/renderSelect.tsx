import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SelectState } from './Select.types';
import { selectShorthandProps } from './useSelect';

/**
 * Function that renders the final JSX of the component
 */
export const renderSelect = (state: SelectState) => {
  const { slots, slotProps } = getSlots(state, selectShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};
