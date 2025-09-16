import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */

export const renderPopover_unstable = (state: PopoverState): JSXElement => {
  const {
    appearance,
    arrowRef,
    contentRef,
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
    positioning,
    popoverId,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        appearance,
        arrowRef,
        contentRef,
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
        positioning,
        popoverId,
      }}
    >
      {state.popoverTrigger}
      {state.popoverSurface}
    </PopoverContext.Provider>
  );
};
