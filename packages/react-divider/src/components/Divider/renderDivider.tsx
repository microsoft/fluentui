import * as React from 'react';
import { getSlots, useId } from '@fluentui/react-utilities';
import { DividerState } from './Divider.types';
import { dividerShorthandProps } from './useDivider';

/**
 * Function that renders the final JSX of the component
 */
export const renderDivider = (state: DividerState) => {
  const { slots, slotProps } = getSlots(state, dividerShorthandProps);
  const { children } = state;
  const idBase = children ? useId('divider-') : undefined;
  return (
    <slots.root {...slotProps.root} role="separator" aria-labelledby={idBase}>
      {children && <div id={idBase}>{children}</div>}
    </slots.root>
  );
};
