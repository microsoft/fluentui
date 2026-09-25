'use client';

import type * as React from 'react';
import {
  useDialogContext,
  useDialogSurface as useDialogSurfaceBase,
} from '@fluentui/react-headless-components-preview/dialog';
import { useMotionForwardedRef } from '@fluentui/react-motion';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { DialogSurfaceProps, DialogSurfaceState } from './DialogSurface.types';

/**
 * Create the state required to render DialogSurface.
 */
export const useDialogSurface = (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>): DialogSurfaceState => {
  const { isNestedDialog } = useDialogContext();
  const state = useDialogSurfaceBase(props, ref);
  const motionForwardedRef = useMotionForwardedRef();

  return {
    ...state,
    root: {
      ...state.root,
      ref: useMergedRefs(state.root.ref, motionForwardedRef),
      'data-nested': isNestedDialog ? '' : undefined,
    },
  };
};
