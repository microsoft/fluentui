import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipRender } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip_unstable: TooltipRender = state => {
  const { slots, slotProps } = getSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal>
          <slots.content {...slotProps.content}>
            {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            {state.content.children}
          </slots.content>
        </Portal>
      )}
    </>
  );
};
