import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DividerState } from './Divider.types';
import { dividerShorthandProps } from './useDivider';

/**
 * Function that renders the final JSX of the component
 */
export const renderDivider = (state: DividerState) => {
  const { slots, slotProps } = getSlots(state, dividerShorthandProps);
  const { children, labelledById } = state;

  return (
    <slots.root {...slotProps.root} role="separator" aria-labelledby={labelledById}>
      {children && <div id={labelledById}>{children}</div>}
    </slots.root>
  );
};
