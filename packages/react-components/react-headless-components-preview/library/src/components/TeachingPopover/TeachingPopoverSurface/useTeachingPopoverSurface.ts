'use client';

import type * as React from 'react';
import { usePopoverSurface } from '../../Popover/PopoverSurface/usePopoverSurface';
import { usePopoverContext } from '../../Popover/popoverContext';
import type { TeachingPopoverSurfaceProps, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

export const useTeachingPopoverSurface = (
  props: TeachingPopoverSurfaceProps,
  ref: React.Ref<HTMLDialogElement | HTMLDivElement>,
): TeachingPopoverSurfaceState => {
  const titleId = usePopoverContext(context => context.titleId);
  const labelledProps =
    props['aria-label'] === undefined && props['aria-labelledby'] === undefined && titleId
      ? { ...props, 'aria-labelledby': titleId }
      : props;

  return usePopoverSurface({ role: 'dialog', ...labelledProps }, ref);
};
