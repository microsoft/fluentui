/** @jsxRuntime classic */
/** @jsxFrag React.Fragment */
/** @jsx createElement */

import * as React from 'react';
import { Portal } from '@fluentui/react-portal';

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip_unstable = (state: TooltipState) => {
  assertSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal mountNode={state.mountNode}>
          <state.content>
            {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            {state.content.children}
          </state.content>
        </Portal>
      )}
    </>
  );
};
