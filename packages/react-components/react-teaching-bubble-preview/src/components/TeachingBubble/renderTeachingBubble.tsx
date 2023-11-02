import * as React from 'react';
// import { TeachingBubbleContext } from '../../teachingBubbleContext';
import { PopoverProvider } from '@fluentui/react-popover';
import { TeachingBubbleProvider } from '../../teachingBubbleContext';
import type { TeachingBubbleState } from './TeachingBubble.types';

/**
 * Render the final JSX of TeachingBubble
 */
export const renderTeachingBubble_unstable = (state: TeachingBubbleState) => {
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
      <TeachingBubbleProvider
        value={{ totalPages, currentPage, setTotalPages, setCurrentPage, appearance, onFinish, onPageChange }}
      >
        {state.popoverTrigger}
        {state.open && state.popoverSurface}
      </TeachingBubbleProvider>
    </PopoverProvider>
  );
};
