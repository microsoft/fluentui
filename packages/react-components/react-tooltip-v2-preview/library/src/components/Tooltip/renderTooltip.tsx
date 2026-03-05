/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip_unstable = (state: TooltipState): JSXElement => {
  assertSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      <state.content>
        {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
        {state.content.children}
      </state.content>
    </>
  );
};
