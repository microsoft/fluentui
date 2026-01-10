'use client';

import * as React from 'react';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';
import { usePopoverSurfaceBase_unstable } from './usePopoverSurfaceBase';

/**
 * Create the state required to render PopoverSurface.
 *
 * The returned state can be modified with hooks such as usePopoverSurfaceStyles_unstable,
 * before being passed to renderPopoverSurface_unstable.
 *
 * @param props - props from this instance of PopoverSurface
 * @param ref - reference to root HTMLDivElement of PopoverSurface
 */
export const usePopoverSurface_unstable = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): PopoverSurfaceState => {
  const size = usePopoverContext_unstable(context => context.size);
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const state = usePopoverSurfaceBase_unstable(props, ref);

  return {
    appearance,
    size,
    ...state,
  };
};
