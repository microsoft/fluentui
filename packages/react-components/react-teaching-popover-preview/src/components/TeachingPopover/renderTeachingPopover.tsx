import * as React from 'react';
import { PopoverProvider } from '@fluentui/react-popover';
import { TeachingPopoverProvider } from '../../TeachingPopoverContext';
import type { TeachingPopoverState } from './TeachingPopover.types';

/**
 * Render the final JSX of TeachingPopover
 */
export const renderTeachingPopover_unstable = (state: TeachingPopoverState) => {
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
    totalPages,
    currentPage,
    setCurrentPage,
    setTotalPages,
    onFinish,
    onPageChange,
  } = state;

  return (
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
      <TeachingPopoverProvider
        value={{ totalPages, currentPage, setTotalPages, setCurrentPage, appearance, onFinish, onPageChange }}
      >
        {state.popoverTrigger}
        {state.open && state.popoverSurface}
      </TeachingPopoverProvider>
    </PopoverProvider>
  );
};
