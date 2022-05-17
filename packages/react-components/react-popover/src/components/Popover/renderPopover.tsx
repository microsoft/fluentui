import * as React from 'react';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState) => {
  const {
    appearance,
    arrowRef,
    contentRef,
    inline,
    mountNode,
    noArrow,
    openOnContext,
    openOnHover,
    setOpen,
    size,
    toggleOpen,
    trapFocus,
    triggerRef,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
        inline,
        mountNode,
        noArrow,
        openOnContext,
        openOnHover,
        setOpen,
        toggleOpen,
        triggerRef,
        size,
        trapFocus,
      }}
    >
      {state.popoverTrigger}
      {state.open && state.popoverSurface}
    </PopoverContext.Provider>
  );
};
