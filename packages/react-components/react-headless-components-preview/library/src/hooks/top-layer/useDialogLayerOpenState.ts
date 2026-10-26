'use client';

import type * as React from 'react';
import type { TopLayerMode, UseLayerOpenStateOptions, UseLayerOpenStateReturn } from './types';
import { dialogAdapter } from './dialogAdapter';
import { useLayerOpenStateWith } from './useLayerOpenState';

/**
 * `useLayerOpenState` for layers that can open as a modal `<dialog>`: also accepts `mode="modal"`. Use it only where the
 * layer can be a dialog, so other components don't bundle the dialog code. Switching from `modal` to a popover mode
 * applies on the next open.
 */
export const useDialogLayerOpenState = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerOpenStateOptions<TopLayerMode>,
): UseLayerOpenStateReturn => useLayerOpenStateWith(ref, options, dialogAdapter);
