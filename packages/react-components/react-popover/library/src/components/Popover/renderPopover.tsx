/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { PopoverContext } from '../../popoverContext';
import type { PopoverSlots, PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState): JSXElement => {
  // assertSlots is a no-op here (PopoverSlots is empty), but is required to satisfy the
  // @nx/workspace-no-missing-jsx-pragma lint rule that checks for assertSlots when the JSX pragma is present.
  // The @fluentui/react-jsx-runtime pragma is needed because <state.surfaceMotion> is a SlotComponentType
  // created by presenceMotionSlot() which requires the custom JSX runtime to resolve SLOT_ELEMENT_TYPE_SYMBOL.
  assertSlots<PopoverSlots>(state);

  const {
    appearance,
    arrowRef,
    contentRef,
    inline,
    mountNode,
    open,
    openOnContext,
    openOnHover,
    setOpen,
    size,
    toggleOpen,
    trapFocus,
    triggerRef,
    withArrow,
    inertTrapFocus,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
        inline,
        mountNode,
        open,
        openOnContext,
        openOnHover,
        setOpen,
        toggleOpen,
        triggerRef,
        size,
        trapFocus,
        inertTrapFocus,
        withArrow,
      }}
    >
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
