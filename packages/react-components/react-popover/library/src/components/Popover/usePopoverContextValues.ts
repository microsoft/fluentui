'use client';

import * as React from 'react';
import type { PopoverContextValue } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

export type PopoverContextValues = {
  popover: PopoverContextValue;
};

export function usePopoverContextValues_unstable(state: PopoverState): PopoverContextValues {
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

  const popover = React.useMemo<PopoverContextValue>(
    () => ({
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
    }),
    [
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
    ],
  );

  return { popover };
}
