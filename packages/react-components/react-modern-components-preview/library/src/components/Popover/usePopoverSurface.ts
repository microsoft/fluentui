'use client';

import type * as React from 'react';
import { usePopoverSurface as usePopoverSurfaceBase } from '@fluentui/react-headless-components-preview/popover';
import { useMotionForwardedRef } from '@fluentui/react-motion';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopoverAppearanceContext } from './popoverAppearanceContext';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/** Create the state required to render PopoverSurface. */
export const usePopoverSurface = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDialogElement | HTMLDivElement>,
): PopoverSurfaceState => {
  const state = usePopoverSurfaceBase(props, ref);
  const { appearance, size } = usePopoverAppearanceContext();
  const motionForwardedRef = useMotionForwardedRef();

  return {
    ...state,
    appearance,
    size,
    root: {
      ...state.root,
      id: props.id ?? state.root.id,
      ref: useMergedRefs(state.root.ref, motionForwardedRef),
      'data-appearance': appearance,
      'data-size': size,
    },
  };
};
