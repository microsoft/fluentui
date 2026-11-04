'use client';

import type * as React from 'react';
import type { UseDialogLayerOpenStateOptions } from './types';
import { dialogAdapter } from './dialogAdapter';
import { useLayerFocusReturn } from './useLayerFocusReturn';
import { useLayerOpenStateWith } from './useLayerOpenState';

const NO_FOCUS_RETURN = { when: false } as const;

/**
 * `useLayerOpenState` for layers that can open as a modal `<dialog>`: also accepts `mode="modal"`, and returns focus on
 * close with `returnFocus`. Use it only where the layer can be a dialog, so other components don't bundle the dialog and
 * focus code. Switching from `modal` to a popover mode applies on the next open.
 */
export const useDialogLayerOpenState = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseDialogLayerOpenStateOptions,
): void => {
  const { returnFocus = NO_FOCUS_RETURN, ...openStateOptions } = options;
  const focusReturn = useLayerFocusReturn(ref, returnFocus);
  useLayerOpenStateWith(ref, openStateOptions, dialogAdapter, focusReturn);
};
