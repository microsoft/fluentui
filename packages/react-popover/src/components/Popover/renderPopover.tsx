import * as React from 'react';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState) => {
  const {
    setOpen,
    toggleOpen,
    triggerRef,
    contentRef,
    openOnContext,
    openOnHover,
    mountNode,
    arrowRef,
    size,
    noArrow,
    appearance,
    trapFocus,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        setOpen,
        toggleOpen,
        triggerRef,
        contentRef,
        openOnHover,
        openOnContext,
        mountNode,
        arrowRef,
        size,
        noArrow,
        appearance,
        trapFocus,
      }}
    >
      {state.popoverTrigger}
      {state.open && state.popoverSurface}
    </PopoverContext.Provider>
  );
};
