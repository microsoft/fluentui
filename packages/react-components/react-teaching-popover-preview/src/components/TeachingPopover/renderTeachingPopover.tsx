import * as React from 'react';
import { PopoverProvider } from '@fluentui/react-popover';
import { TeachingPopoverProvider } from '../../TeachingPopoverContext';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Render the final JSX of TeachingPopover
 */
export const renderTeachingPopover_unstable = (
  state: TeachingPopoverState,
  contextValues: TeachingPopoverContextValues,
) => {
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
    // Popover passes context values as part of PopoverState that we inherit
    <PopoverProvider
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
      <TeachingPopoverProvider value={contextValues.teachingPopover}>
        {state.popoverTrigger}
        {state.open && state.popoverSurface}
      </TeachingPopoverProvider>
    </PopoverProvider>
  );
};
