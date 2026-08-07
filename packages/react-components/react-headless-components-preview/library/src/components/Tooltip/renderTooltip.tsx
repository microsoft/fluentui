/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TooltipState, TooltipSlots } from './Tooltip.types';
import { OverlaySurfaceHost } from '../../overlayRuntime';
import type { WithFallbackBehavior } from '../../overlayRuntime/types';

/**
 * Render the final JSX of Tooltip.
 */
export const renderTooltip = (state: TooltipState): JSXElement => {
  assertSlots<TooltipSlots>(state);
  const { fallbackBehavior } = state as WithFallbackBehavior<TooltipState>;

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <OverlaySurfaceHost active={state.visible} keepMountedWhenInactive>
          <state.content>
            {state.withArrow && <div ref={state.arrowRef} data-arrow="" />}
            {state.content.children}
          </state.content>
        </OverlaySurfaceHost>
      )}
      {fallbackBehavior}
    </>
  );
};
