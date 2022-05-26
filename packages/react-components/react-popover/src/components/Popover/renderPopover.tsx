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
    openOnContext,
    openOnHover,
    setOpen,
    size,
    toggleOpen,
    trapFocus,
    triggerRef,
    withArrow,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
        inline,
        mountNode,
        openOnContext,
        openOnHover,
        setOpen,
        toggleOpen,
        triggerRef,
        size,
        trapFocus,
        withArrow,
      }}
    >
      {state.popoverTrigger}
      {state.open && state.popoverSurface}
    </PopoverContext.Provider>
  );
};
