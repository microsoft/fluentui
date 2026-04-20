/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { PopoverContext, popoverContextDefaultValue } from '../../popoverContext';
import type { InternalPopoverSlots, PopoverState } from './Popover.types';
import type { PopoverContextValues } from './usePopoverContextValues';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState, contextValues?: PopoverContextValues): JSXElement => {
  assertSlots<InternalPopoverSlots>(state);

  return (
    <PopoverContext.Provider value={contextValues?.popover ?? popoverContextDefaultValue}>
      {state.popoverTrigger}
      {state.popoverSurface && (
        <state.surfaceMotion>
          <MotionRefForwarder>
            {/* Casting here as content should be equivalent to <PopoverSurface /> */}
            {/* FIXME: content should not be ReactNode it should be ReactElement instead. */}
            {state.popoverSurface as React.ReactElement}
          </MotionRefForwarder>
        </state.surfaceMotion>
      )}
    </PopoverContext.Provider>
  );
};
