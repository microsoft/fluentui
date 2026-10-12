/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TooltipState, TooltipSlots } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip.
 */
export const renderTooltip = (state: TooltipState): JSXElement => {
  assertSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <state.content>
          {state.withArrow && <div ref={state.arrowRef} data-arrow="" />}
          {state.content.children}
        </state.content>
      )}
    </>
  );
};
