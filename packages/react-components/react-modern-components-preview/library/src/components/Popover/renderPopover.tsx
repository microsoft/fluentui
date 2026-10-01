/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { renderPopover as renderPopoverBase } from '@fluentui/react-headless-components-preview/popover';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { PopoverContextValue } from './Popover.types';
import type { PopoverInternalSlots, PopoverState } from './Popover.types';
import { PopoverAppearanceContext } from './popoverAppearanceContext';

/** Render the Popover using the headless behavior context and the modern visual context. */
export const renderPopover = (
  state: PopoverState,
  contextValues: { popover: PopoverContextValue },
): React.ReactElement => {
  assertSlots<PopoverInternalSlots>(state);

  const popoverSurface = state.popoverSurface ? (
    <state.surfaceMotion>
      <MotionRefForwarder>{state.popoverSurface}</MotionRefForwarder>
    </state.surfaceMotion>
  ) : undefined;

  return (
    <PopoverAppearanceContext.Provider value={{ appearance: state.appearance, size: state.size }}>
      {renderPopoverBase(
        {
          ...state,
          open: Boolean(popoverSurface),
          popoverSurface,
        },
        contextValues,
      )}
    </PopoverAppearanceContext.Provider>
  );
};
