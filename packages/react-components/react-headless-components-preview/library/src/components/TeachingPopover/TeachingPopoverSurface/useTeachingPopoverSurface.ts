'use client';

import type * as React from 'react';
import { usePopoverSurface } from '../../Popover/PopoverSurface/usePopoverSurface';
import type { TeachingPopoverSurfaceProps, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

export const useTeachingPopoverSurface = (
  props: TeachingPopoverSurfaceProps,
  ref: React.Ref<HTMLDialogElement | HTMLDivElement>,
): TeachingPopoverSurfaceState => usePopoverSurface({ role: 'dialog', ...props }, ref);
