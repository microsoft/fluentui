import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { DividerState } from './Divider.types';
import { dividerShorthandProps } from './useDivider';

/**
 * Function that renders the final JSX of the component
 */
export const renderDivider = (state: DividerState) => {
  const { slots, slotProps } = getSlotsCompat(state, dividerShorthandProps);
  const { children } = state;

  return (
    <slots.root {...slotProps.root} role="separator">
      {children !== undefined && <slots.wrapper {...slotProps.wrapper} />}
    </slots.root>
  );
};
