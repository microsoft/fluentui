import * as React from 'react';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable = (state: PopoverState) => {
  const {
    open,
    setOpen,
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
        open,
        setOpen,
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
      {state.children}
    </PopoverContext.Provider>
  );
};
