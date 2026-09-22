'use client';

import { usePopoverSurface as usePopoverSurfaceBase } from '@fluentui/react-headless-components-preview/popover';
import { useMotionForwardedRef } from '@fluentui/react-motion';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopoverAppearanceContext } from '../Popover/popoverAppearanceContext';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/** Create the state required to render PopoverSurface. */
export const usePopoverSurface = (
  props: PopoverSurfaceProps,
  ref: Parameters<typeof usePopoverSurfaceBase>[1],
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
