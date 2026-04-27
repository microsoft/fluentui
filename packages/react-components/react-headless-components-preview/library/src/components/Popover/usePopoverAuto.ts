'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverState } from './Popover.types';
import { usePopoverBase, ensureNativePopoverShown } from './usePopoverBase';

type ToggleEventLike = Event & { newState?: 'open' | 'closed' };

export const usePopoverAuto = (props: PopoverProps): PopoverState => {
  const base = usePopoverBase(props);
  const { open, setOpenState, contentRef, inline } = base;

  const onSurfaceToggle = useEventCallback((event: Event) => {
    const toggle = event as ToggleEventLike;
    const nextOpen = toggle.newState === 'open';
    if (nextOpen === open) {
      return;
    }
    setOpenState(nextOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: nextOpen });
  });

  React.useEffect(() => {
    const surface = contentRef.current;

    if (!surface || inline || !open) {
      return;
    }

    ensureNativePopoverShown(surface, 'auto');
    surface.addEventListener('toggle', onSurfaceToggle);
    return () => surface.removeEventListener('toggle', onSurfaceToggle);
  }, [open, inline, contentRef, onSurfaceToggle]);

  return { ...base, popoverType: 'auto' };
};
