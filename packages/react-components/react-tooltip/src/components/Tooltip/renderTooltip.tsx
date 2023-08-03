/** @jsxRuntime classic */
/** @jsxFrag React.Fragment */
/** @jsx createElement */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip_unstable = (state: TooltipState) => {
  const { slots, slotProps } = getSlotsNext<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal mountNode={state.mountNode}>
          <slots.content {...slotProps.content}>
            {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            {state.content.children}
          </slots.content>
        </Portal>
      )}
    </>
  );
};
