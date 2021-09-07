import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 * {@docCategory Tooltip}
 */
export const renderTooltip = (state: TooltipState) => {
  const { slots, slotProps } = getSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal>
          <slots.root {...slotProps.root}>
            {state.pointing && <div ref={state.arrowRef} className={state.arrowClassName} />}
            {state.content}
          </slots.root>
        </Portal>
      )}
    </>
  );
};
