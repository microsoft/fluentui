/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import { renderTeachingPopover as renderTeachingPopoverBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { PopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type { PopoverInternalSlots } from '../../Popover/Popover/Popover.types';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

export const renderTeachingPopover = (
  state: TeachingPopoverState,
  contextValues: TeachingPopoverContextValues,
): React.ReactElement => {
  assertSlots<PopoverInternalSlots>(state);
  const popoverSurface = state.popoverSurface ? (
    <state.surfaceMotion>
      <MotionRefForwarder>{state.popoverSurface}</MotionRefForwarder>
    </state.surfaceMotion>
  ) : undefined;

  return (
    <PopoverAppearanceContext.Provider value={{ appearance: state.appearance, size: state.size }}>
      {renderTeachingPopoverBase(
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
