import * as React from 'react';
import { PopoverContext } from '../../popoverContext';
import type { PopoverRender } from './Popover.types';

/**
 * Render the final JSX of Popover
 */
export const renderPopover_unstable: PopoverRender = state => {
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
